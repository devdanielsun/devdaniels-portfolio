import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LandingData } from '../../models/landing-data.interface';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  imports: [MatCardModule]
})
export class LandingComponent {
  data: LandingData | undefined;

  constructor() {
    this.data = {
      name: 'Daniël Geerts',
      links: [
        { label: 'GitHub', url: 'https://github.com/devdanielsun' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/devdanielsun/' },
        { label: 'Portfolio', url: '/portfolio' },
      ],
    };
  }
}