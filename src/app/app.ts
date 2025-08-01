import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxParticlesModule } from '@tsparticles/angular';
import { Engine } from '@tsparticles/engine';
import { loadLinksPreset } from '@tsparticles/preset-links';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, NgxParticlesModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('devdaniels-portfolio');
  protected readonly routes = routes;
  navRoutes = routes.filter(r => r.title);

  id = 'tsparticles';

  particlesOptions = {
    preset: 'links',
    background: {
      color: {
        value: 'black',
      },
    },
  };

  async particlesInit(engine: Engine): Promise<void> {
    await loadLinksPreset(engine);
  }
}
