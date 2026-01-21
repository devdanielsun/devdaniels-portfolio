import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faHatWizard, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { ContainerComponent } from '../../components/container-component/container.component';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FontAwesomeModule,
    ContainerComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  protected readonly portfolioRoute = '/portfolio';
  protected readonly faGithub = faGithubSquare;
  protected readonly faLinkedin = faLinkedin;
  protected readonly faWizard = faHatWizard;
  protected readonly faAnglesRight = faAnglesRight;
}
