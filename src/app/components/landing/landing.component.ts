import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LandingData } from '../../models/landing-data.interface';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  imports: [MatCardModule]
})
export class LandingComponent {
  data: LandingData | undefined;

  constructor() {
    this.data = {
      name: 'Daniël Geerts',
      function: 'DevOps Developer - focused on C# and Azure Bicep',
      description: 'A passionate software developer with a focus on C# and Azure domain. Check my links, or check my portfolio:',
      imagePath: 'https://avatars.githubusercontent.com/u/devdanielsun?v=4',
      links: [
        { label: 'GitHub', icon: 'github', url: 'https://github.com/devdanielsun' },
        { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/devdanielsun/' },
        { label: '> Portfolio', url: '/portfolio' },
      ],
    };
  }
}