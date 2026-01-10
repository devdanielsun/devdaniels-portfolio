import type { Routes } from '@angular/router';
import { ArticleRouteData } from '../models/article.model';
import { CODEERTS_ARTICLE, Codeerts } from './codeerts/codeerts.article';

// Registry entries: add new articles here
const ARTICLE_REGISTRY = [
  {
    meta: CODEERTS_ARTICLE,
    // avoid dynamic import complexity by returning the component directly
    loadComponent: () => Promise.resolve(Codeerts)
  }
];

export function createArticleChildren(): Routes {
  return ARTICLE_REGISTRY.map(entry => ({
    path: entry.meta.slug,
    loadComponent: entry.loadComponent,
    data: { article: entry.meta } as ArticleRouteData
  }));
}

export const ARTICLES = ARTICLE_REGISTRY.map(e => e.meta);