import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { NgxParticlesModule } from '@tsparticles/angular';
import { loadLinksPreset } from '@tsparticles/preset-links';
import { loadSlim } from '@tsparticles/slim';
import { NgParticlesService } from '@tsparticles/angular';
import type { Container } from '@tsparticles/engine';
import { fromEvent, debounceTime } from 'rxjs';
import { routes } from './app.routes';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SvgLoaderService } from './services/svg-loader.service';
import { readCssVar, resolveCssColor } from './utils/css-utils';
import { SafeHtml } from '@angular/platform-browser';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { diLinkedinPlain } from '@ng-icons/devicon/plain';
import { simpleGithub } from '@ng-icons/simple-icons';
import {
  faSolidHeart,
  faSolidMoon,
  faSolidSun,
  faSolidBars,
  faSolidXmark,
} from '@ng-icons/font-awesome/solid';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    NgxParticlesModule,
    MatTooltipModule,
    NgIconComponent,
  ],
  providers: [
    provideIcons({
      diLinkedinPlain,
      simpleGithub,
      faSolidHeart,
      faSolidMoon,
      faSolidSun,
      faSolidBars,
      faSolidXmark,
    }),
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  public router = inject(Router);
  private readonly ngParticlesService = inject(NgParticlesService);
  private readonly svgLoader = inject(SvgLoaderService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  protected logoSvg?: SafeHtml;

  protected readonly routes = routes;
  navRoutes = routes
    .filter((r) => r.title)
    .filter((r) => r.path !== '404' && r.path !== '**');

  protected readonly currentYear = new Date().getFullYear();

  isDarkMode = true;
  isMobileMenuOpen = signal(false);

  private particlesContainer?: Container;
  protected readonly id = 'tsparticles';
  particlesOptions = signal<object>({});

  ngOnInit(): void {
    if (this.isBrowser) {
      this.svgLoader
        .loadSvg('assets/logo-devdaniels.svg')
        .subscribe((svg) => (this.logoSvg = svg as SafeHtml));
    }

    if (!this.isBrowser) return;

    this.ngParticlesService.init(async (engine) => {
      await loadSlim(engine);
      await loadLinksPreset(engine);
    });

    const theme = localStorage.getItem('theme');
    this.isDarkMode = theme === 'dark' || theme === null;

    document.documentElement.classList.toggle('dark-theme', this.isDarkMode);
    document.documentElement.classList.toggle('light-theme', !this.isDarkMode);

    this.particlesOptions.set(this.buildParticleOptions());

    fromEvent(window, 'resize')
      .pipe(debounceTime(150), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateParticles());
  }

  private buildParticleOptions(): object {
    const particleColor = resolveCssColor('--mat-sys-primary');
    const bgColor = resolveCssColor('--mat-sys-background');

    const breakTablet = parseInt(readCssVar('--break-tablet'));
    const breakMobile = parseInt(readCssVar('--break-mobile'));
    const width = window.innerWidth;

    let particleCount = 80;
    if (width <= breakTablet) particleCount = 40;
    if (width <= breakMobile) particleCount = 20;

    return {
      preset: 'links',
      background: { color: bgColor },
      particles: {
        number: { value: particleCount },
        color: { value: particleColor },
        links: { color: particleColor },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: 'repulse' } },
        modes: {
          push: { particles_nb: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
    };
  }

  private updateParticles(): void {
    const options = this.buildParticleOptions();
    this.particlesOptions.set(options);
    this.particlesContainer?.reset(options);
  }

  protected async particlesLoaded(container: Container): Promise<void> {
    this.particlesContainer = container;
  }

  toggleTheme() {
    if (!this.isBrowser) return;

    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');

    document.documentElement.classList.toggle('dark-theme', this.isDarkMode);
    document.documentElement.classList.toggle('light-theme', !this.isDarkMode);

    this.updateParticles();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
