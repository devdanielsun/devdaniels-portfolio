import { inject, isDevMode } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { Article, ResolvedArticle } from '../models/article.model';
import { ARTICLE_SLUGS } from '../articles/articles.registry';
import { parseFrontmatter } from '../utils/frontmatter.parser';

export const articleResolver: ResolveFn<ResolvedArticle | undefined> = (
  route: ActivatedRouteSnapshot,
) => {
  const slug = route.paramMap.get('slug') ?? '';
  const http = inject(HttpClient);
  const router = inject(Router);

  if (!ARTICLE_SLUGS.includes(slug)) {
    router.navigate(['/404']);
    return of(undefined);
  }

  return http.get(`assets/articles/${slug}.md`, { responseType: 'text' }).pipe(
    map((raw) => {
      const { data, content } = parseFrontmatter<Article>(raw);
      if (!isDevMode() && !data.published) {
        router.navigate(['/404']);
        return undefined;
      }
      return { article: data, markdownContent: content } as ResolvedArticle;
    }),
    catchError(() => {
      router.navigate(['/404']);
      return of(undefined);
    }),
  );
};
