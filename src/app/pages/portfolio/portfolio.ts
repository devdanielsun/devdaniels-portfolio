import { Component, inject } from '@angular/core';
import { ContainerComponent } from '../../modules/container-component/container.component';
import { Router, RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  diLinuxPlain,
  diCsharpPlain,
  diGitPlain,
  diAngularPlain,
  diNodejsPlainWordmark,
  diStackoverflowPlain,
  diAzuredevopsPlain,
  diAzuresqldatabasePlain,
  diGithubcodespacesPlain,
  diTypescriptPlain,
  diAzurePlain,
  diCloudflarePlain,
  diVscodePlain,
  diNpmPlain,
  diJsonPlain,
} from '@ng-icons/devicon/plain';
import {
  faGraduationCap,
  faAward,
  faCode,
  faTimeline,
  faCloud,
  faCodeBranch,
} from '@fortawesome/free-solid-svg-icons';
import { ArticlesListComponent } from '../../modules/article-list-component/articles-list.component';

@Component({
  selector: 'app-portfolio',
  imports: [
    RouterLink,
    ContainerComponent,
    FontAwesomeModule,
    MatGridListModule,
    NgIconComponent,
    ArticlesListComponent,
  ],
  providers: [
    provideIcons({
      diLinuxPlain,
      diCsharpPlain,
      diGitPlain,
      diAngularPlain,
      diNodejsPlainWordmark,
      diTypescriptPlain,
      diStackoverflowPlain,
      diAzuredevopsPlain,
      diAzuresqldatabasePlain,
      diGithubcodespacesPlain,
      diAzurePlain,
      diCloudflarePlain,
      diVscodePlain,
      diNpmPlain,
      diJsonPlain,
    }),
  ],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  private router = inject(Router);

  protected readonly faGraduationCap = faGraduationCap;
  protected readonly faAward = faAward;
  protected readonly faCode = faCode;
  protected readonly faTimeline = faTimeline;
  protected readonly faCloud = faCloud;
  protected readonly faCodeBranch = faCodeBranch;

  goToProject(projectUri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([projectUri]);
    });
  }
}
