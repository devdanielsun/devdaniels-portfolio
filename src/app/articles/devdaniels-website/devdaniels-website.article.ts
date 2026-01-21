import { Component } from '@angular/core';
import { Article, Author } from '../../models/article.model';

export const DEVDANIELS_WEBSITE_ARTICLE: Article = {
  published: true,
  slug: 'devdaniels-website',
  author: Author.DanielGeerts,
  title: 'DevDaniels Website',
  shortDescription: 'Project DevDaniels Website.',
  startDate: '2025',
  categories: ['Project', 'Web Development'],
  featuredImage: {
    altText: 'DevDaniels Website Architecture',
    srcPath:
      'assets/images/project/devdaniels-website/devdaniels-website-architecture.jpg',
  },
  githubRepo: {
    label: 'Github - DevDaniels Website',
    link: 'https://github.com/devdanielsun/devdaniels-website',
  },
  tags: [
    'Angular',
    'Typescript',
    'Cloudflare',
    'Azure',
    'Node.js',
    'SCSS',
    'CI/CD',
  ],
};

@Component({
  selector: 'app-devdaniels-website-article',
  templateUrl: './devdaniels-website.article.html',
})
export class DevDanielsWebsiteArticle {}
