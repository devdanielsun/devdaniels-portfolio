import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgxParticlesModule } from '@tsparticles/angular';
import { loadLinksPreset } from '@tsparticles/preset-links';
import { loadSlim } from '@tsparticles/slim';
import { NgParticlesService } from '@tsparticles/angular';
import type { Container } from '@tsparticles/engine';
import { routes } from './app.routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SvgLoaderService } from './services/svg-loader.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
    NgxParticlesModule,
    FontAwesomeModule,
    MatTooltipModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  public router = inject(Router);
  private readonly ngParticlesService = inject(NgParticlesService);
  private readonly svgLoader = inject(SvgLoaderService);

  protected logoSvg?: SafeHtml;

  protected readonly faMoon = faMoon;
  protected readonly faSun = faSun;

  protected readonly routes = routes;
  navRoutes = routes
    .filter((r) => r.title)
    .filter((r) => r.path !== '404' && r.path !== '**');

  isDarkMode = true; // Default to dark theme

  // Set particles options based on the current theme
  private particlesContainer?: Container;
  protected readonly id = 'tsparticles';
  particlesOptions = {};

  ngOnInit(): void {
    // load svg logo
    this.svgLoader
      .loadSvg('assets/logo-devdaniels.svg')
      .subscribe((svg) => (this.logoSvg = svg as SafeHtml));

    // Initialize particles with the slim engine and links preset
    this.ngParticlesService.init(async (engine) => {
      await loadSlim(engine);
      await loadLinksPreset(engine); // << important for 'links' preset
    });

    const theme = localStorage.getItem('theme');
    this.isDarkMode = theme === 'dark' || theme === null; // Default to dark if not set

    document.documentElement.classList.toggle('dark-theme', this.isDarkMode);
    document.documentElement.classList.toggle('light-theme', !this.isDarkMode);

    this.particlesOptions = this.createOptions();

    if (this.particlesContainer) {
      this.particlesContainer.refresh();
    }

    // Listen for resize to adjust particle count dynamically
    window.addEventListener('resize', () => this.createOptions());
  }

  // Create particles options based on the current theme
  createOptions() {
    const particleColor = resolveCssColor('--mat-sys-primary');
    const bgColor = resolveCssColor('--mat-sys-background');

    // Set default number of particles
    let particleCount = 80; // desktop default

    // Reduce particles on smaller screens
    const width = window.innerWidth;

    if (width <= 768) {
      // tablet
      particleCount = 40;
    }
    if (width <= 600) {
      // mobile
      particleCount = 20;
    }

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

  // Handle particles loaded event
  async particlesLoaded(container: Container): Promise<void> {
    console.log('Particles loaded', container);
    this.particlesContainer = container;
  }

  // Toggle theme
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');

    document.documentElement.classList.toggle('dark-theme', this.isDarkMode);
    document.documentElement.classList.toggle('light-theme', !this.isDarkMode);

    this.particlesOptions = this.createOptions();

    if (this.particlesContainer) {
      this.particlesContainer.reset(this.particlesOptions);
    }
  }
}

function resolveCssColor(varName: string): string {
  // Create a temporary element
  const el = document.createElement('div');
  el.style.display = 'none';
  el.style.backgroundColor = `var(${varName})`;

  document.body.appendChild(el);

  // Browser resolves "light-dark(...)" into actual rgb(...)
  const resolved = getComputedStyle(el).backgroundColor;

  document.body.removeChild(el);

  return resolved.trim();
}
