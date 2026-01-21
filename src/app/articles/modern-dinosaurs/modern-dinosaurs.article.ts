import { Component } from '@angular/core';
import { Article, Author } from '../../models/article.model';

export const MODERN_DINOSAURS_ARTICLE: Article = {
  published: false,
  slug: 'modern-dinosaurs',
  author: Author.DanielGeerts,
  title: 'Modern Dinosaurs',
  shortDescription:
    'Hoe overleven dinosaurussen in de moderne tijd? Dit is een art project, waarbij vervuiling en afval naar voren komt, waarbij dinosaurussen struggelen met het afval dat de mens heeft geproduceerd en heeft gedumpt.',
  startDate: '2026',
  endDate: '2026',
  categories: ['Art'],
  featuredImage: {
    altText: 'Dinosaur trapped in garbage',
    srcPath: 'assets/images/art/modern-dinosaur/t-rex-tin-can.png',
  },
  tags: ['Photography'],
};

@Component({
  selector: 'app-modern-dinosaurs-article',
  templateUrl: './modern-dinosaurs.article.html',
})
export class ModernDinosaursArticle {}
