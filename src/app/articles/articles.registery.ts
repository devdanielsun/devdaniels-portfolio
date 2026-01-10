import { CODEERTS_ARTICLE, CodeertsArticle } from './codeerts/codeerts.article';
import { POLLOR_ARTICLE, PollorArticle } from './pollor/pollor.article';

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
];

export const ARTICLES = ARTICLE_REGISTRY.map((e) => e.meta).filter(
  (a) => a.published,
);

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
