import { Component } from '@angular/core';
import { Article, Author } from '../../models/article.model';

export const DEVEGANEETCLUB_ARTICLE: Article = {
  published: false,
  slug: 'deveganeetclub-website',
  author: Author.DanielGeerts,
  title: 'Deveganeetclub',
  shortDescription:
    'Een vegan recepten website. Lees meer over hoe dit is opgezet. Frontend: Hugo. Backend: Decap CMS. Check de Github repo en het architectuur plaatje.',
  startDate: '2026',
  categories: ['Project', 'Web Development'],
  featuredImage: {
    altText: 'Deveganeetclub Logo',
    srcPath:
      'assets/images/project/deveganeetclub-website/deveganeetclub-website-logo.png',
  },
  githubRepo: {
    label: 'Github - deveganeetclub',
    link: 'https://github.com/devdanielsun/deveganeetclub',
  },
  tags: [
    'Hugo',
    'Decap CMS',
    'CI/CD',
    'Cloudflare',
    'Azure',
    'Github Workflow',
  ],
};

@Component({
  selector: 'app-deveganeetclub-website-article',
  templateUrl: './deveganeetclub-website.article.html',
})
export class DeVeganEetClubArticle {}
