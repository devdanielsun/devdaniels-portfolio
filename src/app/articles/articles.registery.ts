import { isDevMode } from '@angular/core';
import { CODEERTS_ARTICLE, CodeertsArticle } from './codeerts/codeerts.article';
import { POLLOR_ARTICLE, PollorArticle } from './pollor/pollor.article';
import {
  MODERN_DINOSAURS_ARTICLE,
  ModernDinosaursArticle,
} from './modern-dinosaurs/modern-dinosaurs.article';
import {
  DEVDANIELS_WEBSITE_ARTICLE,
  DevDanielsWebsiteArticle,
} from './devdaniels-website/devdaniels-website.article';
import {
  DEVEGANEETCLUB_ARTICLE,
  DeVeganEetClubArticle,
} from './deveganeetclub/deveganeetclub-website.article';
import {
  IBM_CICD_CASESTUDY_ARTICLE,
  IbmCicdCasestudyArticle,
} from './ibm-cicd-casestudy/ibm-cicd-casestudy.article';

// Registry entries: add new articles here
const ARTICLE_REGISTRY = [
  {
    meta: CODEERTS_ARTICLE,
    // avoid dynamic import complexity by returning the component directly
    loadComponent: () => Promise.resolve(CodeertsArticle),
  },
  {
    meta: POLLOR_ARTICLE,
    loadComponent: () => Promise.resolve(PollorArticle),
  },
  {
    meta: MODERN_DINOSAURS_ARTICLE,
    loadComponent: () => Promise.resolve(ModernDinosaursArticle),
  },
  {
    meta: DEVDANIELS_WEBSITE_ARTICLE,
    loadComponent: () => Promise.resolve(DevDanielsWebsiteArticle),
  },
  {
    meta: DEVEGANEETCLUB_ARTICLE,
    loadComponent: () => Promise.resolve(DeVeganEetClubArticle),
  },
  {
    meta: IBM_CICD_CASESTUDY_ARTICLE,
    loadComponent: () => Promise.resolve(IbmCicdCasestudyArticle),
  },
];

// TODO: check if debug mode or not. If debug mode show all articles.
export const ARTICLES = ARTICLE_REGISTRY.map((e) => e.meta).filter((a) => {
  if (isDevMode()) {
    return true;
  }
  return a.published;
});

export function findArticleBySlug(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function findLoaderBySlug(slug: string) {
  const entry = ARTICLE_REGISTRY.find((e) => e.meta.slug === slug);
  return entry?.loadComponent;
}

export function findArticlesByCategory(category: string) {
  return ARTICLES.filter((a) => a.category?.includes(category));
}

export function listCategories() {
  const set = new Set<string>();
  for (const a of ARTICLES) {
    (a.category || []).forEach((c) => set.add(c));
  }
  return Array.from(set);
}
