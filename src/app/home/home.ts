import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faHatWizard, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { ContainerComponent } from "../modules/container-component/container-component";

@Component({
  selector: 'app-home',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FontAwesomeModule,
    ContainerComponent
],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  protected readonly portfolioRoute = '/portfolio';
  protected readonly faGithub = faGithubSquare;
  protected readonly faLinkedin = faLinkedin;
  protected readonly faWizard = faHatWizard;
  protected readonly faAnglesRight = faAnglesRight;

  goToGithub() {
    window.open('https://github.com/devdanielsun/', '_blank');
  }
  
  goToLinkedIn() {
    window.open('https://www.linkedin.com/in/danielgeerts/', '_blank');
  }

  goToPortfolio() {
    window.open(this.portfolioRoute, '_self');
  }
}
