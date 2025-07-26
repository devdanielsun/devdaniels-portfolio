import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Add this import
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- Add CommonModule here
  template: `
    <main>
      <nav>
        <a *ngFor="let route of navRoutes"
          [routerLink]="route.path"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }">
          {{ route.title }}
        </a>
      </nav>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('devdaniels-portfolio');
  protected readonly routes = routes;
  navRoutes = routes.filter(r => r.title);
}
