import { Component } from '@angular/core';
import { ContainerComponent } from "../../modules/container-component/container.component";
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  diAzureOriginal,
  diCsharpOriginal,
  diGitOriginal,
  diAngularOriginal,
  diReactOriginal,
  diNodejsOriginal,
  diGithubOriginal } from '@ng-icons/devicon/original';
import { faSolidIdCard } from '@ng-icons/font-awesome/solid';

@Component({
  selector: 'app-portfolio',
  imports: [
    ContainerComponent,
    FontAwesomeModule,
    MatGridListModule,
    NgIconComponent
  ],
  providers: [
    provideIcons({
      diAzureOriginal,
      diCsharpOriginal,
      diGitOriginal,
      faSolidIdCard,
      diAngularOriginal,
      diReactOriginal,
      diNodejsOriginal,
      diGithubOriginal
    })
  ],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class Portfolio {
  constructor(private router: Router) {}

  goToProject(projectUri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([projectUri]);
    });
  }
}
