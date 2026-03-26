import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { ARTICLE_SLUGS } from './articles/articles.registry';
import { parseFrontmatter } from './utils/frontmatter.parser';
import { Article } from './models/article.model';

function getPublishedCategories(): string[] {
  const categories = new Set<string>();
  const articlesDir = join(process.cwd(), 'src/assets/articles');
  for (const slug of ARTICLE_SLUGS) {
    try {
      const raw = readFileSync(join(articlesDir, `${slug}.md`), 'utf-8');
      const { data } = parseFrontmatter<Article>(raw);
      if (data.published) {
        data.categories?.forEach((c) => categories.add(c));
      }
    } catch {
      // skip unreadable files
    }
  }
  return Array.from(categories);
}

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
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return getPublishedCategories().map((category) => ({ category }));
    },
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
