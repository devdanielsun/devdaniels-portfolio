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

export const ARTICLES = ARTICLE_REGISTRY.map(e => e.meta);

export function findArticleBySlug(slug: string) {
  return ARTICLES.find(a => a.slug === slug);
}

export function findLoaderBySlug(slug: string) {
  const entry = ARTICLE_REGISTRY.find(e => e.meta.slug === slug);
  return entry?.loadComponent;
}

export function findArticlesByCategory(category: string) {
  return ARTICLES.filter(a => a.category?.includes(category));
}

export function listCategories() {
  const set = new Set<string>();
  for (const a of ARTICLES) {
    (a.category || []).forEach(c => set.add(c));
  }
  return Array.from(set);
}