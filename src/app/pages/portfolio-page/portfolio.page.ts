import { Component, inject } from '@angular/core';
import { ContainerComponent } from '../../components/container-component/container.component';
import { Router, RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  diLinuxPlain,
  diCsharpPlain,
  diGitPlain,
  diAngularPlain,
  diAzuredevopsPlain,
  diAzurePlain,
  diAzuresqldatabasePlain,
  diGithubcodespacesPlain,
  diTypescriptPlain,
  diCloudflarePlain,
  diVscodePlain,
  diNpmPlain,
  diTerraformPlain,
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
import { ArticlesListPage } from '../article-list-page/articles-list.page';

@Component({
  selector: 'app-portfolio-page',
  imports: [
    RouterLink,
    ContainerComponent,
    FontAwesomeModule,
    MatGridListModule,
    NgIconComponent,
    ArticlesListPage,
    MatTooltipModule,
  ],
  providers: [
    provideIcons({
      diLinuxPlain,
      diCsharpPlain,
      diGitPlain,
      diAngularPlain,
      diTypescriptPlain,
      diAzurePlain,
      diAzuredevopsPlain,
      diAzuresqldatabasePlain,
      diGithubcodespacesPlain,
      diCloudflarePlain,
      diVscodePlain,
      diNpmPlain,
      diTerraformPlain,
      diJsonPlain,
    }),
  ],
  templateUrl: './portfolio.page.html',
  styleUrl: './portfolio.page.scss',
})
export class PortfolioPage {
  private router = inject(Router);

  protected readonly faGraduationCap = faGraduationCap;
  protected readonly faAward = faAward;
  protected readonly faCode = faCode;
  protected readonly faTimeline = faTimeline;
  protected readonly faCloud = faCloud;
  protected readonly faCodeBranch = faCodeBranch;

  protected readonly listOfBrandIcons: BrandIcon[] = [
    // Column 1
    { col: 1, icon: 'diAzurePlain', tooltip: 'Azure' },
    { col: 1, icon: 'diCloudflarePlain', tooltip: 'Cloudflare' },
    { col: 1, icon: 'diLinuxPlain', tooltip: 'Linux' },
    // Column 2
    { col: 2, icon: 'diTerraformPlain', tooltip: 'Terraform / Bicep' },
    { col: 2, icon: 'diCsharpPlain', tooltip: 'C# .net' },
    {
      col: 2,
      icon: 'diAzuresqldatabasePlain',
      tooltip: 'SQL Databases',
    },
    { col: 2, icon: 'diJsonPlain', tooltip: 'JSON / XML' },
    // Column 3
    { col: 3, icon: 'diTypescriptPlain', tooltip: 'TypeScript' },
    { col: 3, icon: 'diAngularPlain', tooltip: 'Angular' },
    { col: 3, icon: 'diNpmPlain', tooltip: 'npm' },
    { col: 3, icon: 'diVscodePlain', tooltip: 'Visual Studio Code' },
    // Column 4
    { col: 4, icon: 'diGitPlain', tooltip: 'Git' },
    { col: 4, icon: 'diGithubcodespacesPlain', tooltip: 'GitHub' },
    { col: 4, icon: 'diAzuredevopsPlain', tooltip: 'Azure DevOps' },
  ];

  goToProject(projectUri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([projectUri]);
    });
  }
}

interface BrandIcon {
  col: number;
  icon: string;
  tooltip: string;
}
