import { Component } from '@angular/core';
import { Article } from '../../models/article.model';

export const CODEERTS_ARTICLE: Article = {
  title: 'Codeerts',
  shortDescription: 'Tijdens mijn studententijd ben ik als freelance developer actief geweest onder de naam Codeerts, van 2019 tot 2021. Mijn verantwoordelijkheden omvatten het ontwikkelen en onderhouden van websites en webshops voor verschillende klanten.',
  date: '2019 t/m 2021',
  category: ['Projects', 'Freelance'],
  featuredImage: {
    altText: 'Codeerts Logo',
    srcPath: 'assets/images/portfolio/codeerts/codeerts-logo.png'
  },
  slug: 'codeerts',
};

@Component({
  selector: 'app-codeerts',
  templateUrl: './codeerts.article.html',
})
export class Codeerts {
  
}
