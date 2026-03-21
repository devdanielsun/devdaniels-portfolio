import { Component, computed, inject, signal } from '@angular/core';
import { ContainerComponent } from '../../components/container-component/container.component';
import { Router, RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  diLinuxPlain,
  diCsharpPlain,
  diGitPlain,
  diAngularPlain,
  diAzuredevopsPlain,
  diAzurePlain,
  diAzuresqldatabasePlain,
  diTypescriptPlain,
  diCloudflarePlain,
  diVscodePlain,
  diNpmPlain,
  diTerraformPlain,
} from '@ng-icons/devicon/plain';
import { simpleGithub, simpleKubernetes } from '@ng-icons/simple-icons';
import {
  faSolidGraduationCap,
  faSolidAward,
  faSolidCode,
  faSolidTimeline,
  faSolidCloud,
  faSolidCodeBranch,
} from '@ng-icons/font-awesome/solid';
import { ArticlesListPage } from '../article-list-page/articles-list.page';

interface ExperienceSection {
  icon: string;
  title: string;
  subtitle?: string;
  tags: string[];
}

interface ExperienceTabConfig {
  id: string;
  icon: string;
  label: string;
  sections: ExperienceSection[];
}

@Component({
  selector: 'app-portfolio-page',
  imports: [
    RouterLink,
    ContainerComponent,
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
      simpleGithub,
      diCloudflarePlain,
      diVscodePlain,
      diNpmPlain,
      diTerraformPlain,
      simpleKubernetes,
      faSolidGraduationCap,
      faSolidAward,
      faSolidCode,
      faSolidTimeline,
      faSolidCloud,
      faSolidCodeBranch,
    }),
  ],
  templateUrl: './portfolio.page.html',
  styleUrl: './portfolio.page.scss',
})
export class PortfolioPage {
  private router = inject(Router);

  protected readonly activeTab = signal<string>('skills');

  protected readonly experienceTabs: ExperienceTabConfig[] = [
    {
      id: 'skills',
      icon: 'faSolidCode',
      label: 'Skills',
      sections: [
        {
          icon: 'faSolidCodeBranch',
          title: 'Engineering',
          tags: [
            'Software Development',
            'Cloud (Azure, AWS, Cloudflare)',
            'Terraform, Bicep',
            'Docker, Kubernetes',
            'DNS Management, SSL/TLS',
            'CI/CD (Azure DevOps, GitHub Actions)',
          ],
        },
        {
          icon: 'faSolidCloud',
          title: 'Backend',
          tags: [
            'C# .net',
            'RESTful API Development',
            'Azure services',
            'AWS services',
            'SQL / NoSQL',
          ],
        },
        {
          icon: 'faSolidCode',
          title: 'Frontend',
          tags: [
            'Typescript (Angular, React)',
            'HTML, PHP, CSS, SCSS',
            'Responsive Web Design',
          ],
        },
      ],
    },
    {
      id: 'certifications',
      icon: 'faSolidAward',
      label: 'Certifications',
      sections: [
        {
          icon: 'faSolidAward',
          title: 'Cloud Certifications',
          tags: [
            'Azure Fundamentals (AZ-900)',
            'Azure AI Fundamentals (AI-900)',
            'AWS Certified Cloud Practitioner',
            'AWS Certified Developer Associate',
          ],
        },
        {
          icon: 'faSolidAward',
          title: 'Other Certifications',
          tags: [
            'Professional Scrum Master™ I (PSM I)',
            'Docker Essentials: A Developer Introduction',
            'First Aid / Emergency Response',
          ],
        },
      ],
    },
    {
      id: 'education',
      icon: 'faSolidGraduationCap',
      label: 'Education',
      sections: [
        {
          icon: 'faSolidGraduationCap',
          title: 'Bachelor of Applied Sciences',
          subtitle: 'Hanzehogeschool Groningen | HBO-ICT | 2017-2021',
          tags: [
            'Major: Software Engineering',
            'Minor: Smart Energy',
            'Energy Academy Certificate',
            'Graduation project at Rijkswaterstaat',
          ],
        },
        {
          icon: 'faSolidGraduationCap',
          title: 'Game Development',
          subtitle: 'Alfa College Groningen | 2014-2017',
          tags: ['Game Developer'],
        },
      ],
    },
  ];

  protected readonly activeTabData = computed(
    () => this.experienceTabs.find((t) => t.id === this.activeTab()) ?? null,
  );

  protected setTab(id: string): void {
    this.activeTab.set(id);
  }

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
    { col: 2, icon: 'simpleKubernetes', tooltip: 'Docker / Kubernetes' },
    // Column 3
    { col: 3, icon: 'diTypescriptPlain', tooltip: 'TypeScript' },
    { col: 3, icon: 'diAngularPlain', tooltip: 'Angular' },
    { col: 3, icon: 'diNpmPlain', tooltip: 'npm' },
    { col: 3, icon: 'diVscodePlain', tooltip: 'Visual Studio Code' },
    // Column 4
    { col: 4, icon: 'diGitPlain', tooltip: 'Git' },
    { col: 4, icon: 'simpleGithub', tooltip: 'GitHub' },
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
