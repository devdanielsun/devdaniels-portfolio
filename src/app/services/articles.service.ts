import { inject, Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of, shareReplay } from 'rxjs';
import { ARTICLE_SLUGS } from '../articles/articles.registry';
import { Article } from '../models/article.model';
import { parseFrontmatter } from '../utils/frontmatter.parser';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private http = inject(HttpClient);

  // Cache the loaded articles so we don't re-fetch on every navigation
  private articles$: Observable<Article[]> | null = null;

  private loadAll(): Observable<Article[]> {
    if (this.articles$) return this.articles$;

    this.articles$ = forkJoin(
      ARTICLE_SLUGS.map((slug) =>
        this.http
          .get(`assets/articles/${slug}.md`, { responseType: 'text' })
          .pipe(
            map((raw) => parseFrontmatter<Article>(raw).data),
            catchError(() => of(null)),
          ),
      ),
    ).pipe(
      map((articles) =>
        articles
          .filter((a): a is Article => a !== null)
          .filter((a) => (isDevMode() ? true : a.published)),
      ),
      shareReplay(1),
    );

    return this.articles$;
  }

  getArticles(category?: string): Observable<Article[]> {
    return this.loadAll().pipe(
      map((articles) => {
        const filtered = category
          ? articles.filter((a) => a.categories?.includes(category))
          : articles;
        return [...filtered].sort(
          (a, b) =>
            this.extractYear(b.startDate) - this.extractYear(a.startDate),
        );
      }),
    );
  }

  getCategories(): Observable<string[]> {
    return this.loadAll().pipe(
      map((articles) => {
        const set = new Set<string>();
        articles.forEach((a) =>
          (a.categories ?? []).forEach((c) => set.add(c)),
        );
        return Array.from(set);
      }),
    );
  }

  private extractYear(dateStr?: string): number {
    if (!dateStr) return 0;
    const match = dateStr.match(/(\d{4})/);
    return match ? parseInt(match[1], 10) : 0;
  }
}
