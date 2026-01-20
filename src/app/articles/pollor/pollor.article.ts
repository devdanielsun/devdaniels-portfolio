import { Component } from '@angular/core';
import { Article, Author } from '../../models/article.model';

export const POLLOR_ARTICLE: Article = {
  published: false,
  slug: 'pollor',
  author: Author.DanielGeerts,
  title: 'Pollor',
  shortDescription:
    'In dit artikel vertel ik over het project genaamd Pollor. Dit is een platform waar gebruikers enquêtes kunnen maken en delen, waarbij de nadruk ligt op anoniem stemmen. Ik bespreek de gebruikte technologieën, uitdagingen tijdens de ontwikkeling en de behaalde resultaten.',
  date: '2023 t/m heden',
  category: ['Project', 'Web Development'],
  featuredImage: {
    altText: 'Pollor Logo',
    srcPath: 'assets/images/project/pollor/pollor-logo.png',
  },
  tags: ['C# .net', 'Typescript', 'SQL', 'CI/CD', 'Azure'],
};

@Component({
  selector: 'app-pollor.article',
  templateUrl: './pollor.article.html',
})
export class PollorArticle {}
