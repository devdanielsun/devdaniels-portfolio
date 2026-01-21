import { Injectable, inject, isDevMode } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Article } from '../models/article.model';
import { findArticleBySlug } from '../articles/articles.registery';

@Injectable({ providedIn: 'root' })
export class ArticleResolver implements Resolve<Article | undefined> {
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot): Article | undefined {
    const slug = route.paramMap.get('slug') || '';
    const article = findArticleBySlug(slug);
    if (isDevMode()) {
      // In dev mode, allow access to unpublished articles
      return article;
    }
    if (!article || !article.published) {
      this.router.navigate(['/404']);
      return undefined;
    }
    return article;
  }
}
