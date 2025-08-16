import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgxParticlesModule } from '@tsparticles/angular';
import { loadLinksPreset } from "@tsparticles/preset-links";
import { loadSlim } from "@tsparticles/slim";
import { NgParticlesService } from "@tsparticles/angular";
import type { Container } from '@tsparticles/engine';
import { routes } from './app.routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
    NgxParticlesModule,
    FontAwesomeModule,
    MatTooltipModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('devdaniels-portfolio');
  
  protected readonly faMoon = faMoon;
  protected readonly faSun = faSun;

  protected readonly routes = routes;
  navRoutes = routes.filter(r => r.title);

  isDarkMode: boolean = true; // Default to dark theme

  // Set particles options based on the current theme
  private particlesContainer?: Container;
  protected readonly id = 'tsparticles';
  particlesOptions = {};

  constructor(public router: Router, private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
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
  }

  // Create particles options based on the current theme
  createOptions() {
    const particleColor = this.isDarkMode ? '#ffffff' : '#111111';
    const bgColor = this.isDarkMode ? '#111111' : '#ffffff';

    return {
      preset: 'links',
      background: { color: bgColor },
      particles: {
        color: { value: particleColor },
        links: { color: particleColor }
      },
      interactivity: {
        events: { onHover: { enable: true, mode: 'repulse' } },
        modes: { push: { particles_nb: 4 }, repulse: { distance: 200, duration: 0.4 } }
      }
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
