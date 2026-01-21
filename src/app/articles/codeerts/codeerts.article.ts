import { Component } from '@angular/core';
import { Article, Author } from '../../models/article.model';

export const CODEERTS_ARTICLE: Article = {
  published: true,
  slug: 'codeerts',
  author: Author.DanielGeerts,
  title: 'Codeerts',
  shortDescription:
    'Tijdens mijn studententijd ben ik als freelance developer actief geweest onder de naam Codeerts, van 2019 tot 2021. Mijn verantwoordelijkheden omvatten het ontwikkelen en onderhouden van websites en webshops voor verschillende klanten.',
  startDate: '2019',
  endDate: '2021',
  categories: ['Freelance', 'Web Development'],
  featuredImage: {
    altText: 'Codeerts Logo',
    srcPath: 'assets/images/project/codeerts/codeerts-logo.png',
  },
  tags: [
    'Wordpress',
    'Wordpress Custom Plugins',
    'PHP',
    'Javascript',
    'JQuery',
  ],
};

@Component({
  selector: 'app-codeerts',
  templateUrl: './codeerts.article.html',
})
export class CodeertsArticle {}
