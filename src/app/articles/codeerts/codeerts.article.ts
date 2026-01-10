import { Component } from '@angular/core';
import { Article } from '../../models/article.model';

export const CODEERTS_ARTICLE: Article = {
  title: 'Codeerts',
  shortDescription: 'Tijdens mijn studententijd was ik freelance developer onder de naam...',
  date: '2020 t/m 2022',
  category: ['Portfolio', 'Freelance'],
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
