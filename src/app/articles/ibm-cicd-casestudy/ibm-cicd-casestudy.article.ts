import { Component } from '@angular/core';
import { Article, Author } from '../../models/article.model';

export const IBM_CICD_CASESTUDY_ARTICLE: Article = {
  published: true,
  slug: 'ibm-cicd-casestudy',
  author: Author.DanielGeerts,
  title: 'IBM CICD Casestudy',
  shortDescription:
    'IBM Associate. Twee weekse casestudy naar CI/CD en IBM Cloud services.',
  date: '2021',
  category: ['Project', 'Casestudy'],
  featuredImage: {
    altText: 'IBM Logo',
    srcPath: 'assets/images/project/IBM/IBM-logo.png',
  },
  githubRepo: {
    lable: 'Github - IBM CICD Casestudy',
    link: 'https://github.com/devdanielsun/ibm-cicd-casestudy',
  },
  tags: ['Terraform', 'IBM Cloud', 'CI/CD', 'Azure', 'Github Workflow'],
};

@Component({
  selector: 'app-ibm-cicd-casestudy.article',
  templateUrl: './ibm-cicd-casestudy.article.html',
})
export class IbmCicdCasestudyArticle {}
