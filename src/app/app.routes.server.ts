import { RenderMode, ServerRoute } from '@angular/ssr';
import { ARTICLE_SLUGS } from './articles/articles.registry';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'articles',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'articles/category/:category',
    renderMode: RenderMode.Client,
  },
  {
    path: 'articles/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return ARTICLE_SLUGS.map((slug) => ({ slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
