import { Injectable, inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Article } from '../models/article.model';
import { findArticleBySlug } from '../articles/articles.registery';

@Injectable({ providedIn: 'root' })
export class ArticleResolver implements Resolve<Article | null> {
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot): Article | null {
    const slug = route.paramMap.get('slug') || '';
    const article = findArticleBySlug(slug);
    //TODO: only make available when published or when in app is in debug mode
    if (!article || !article.published) {
      // navigate to wildcard 404 route
      this.router.navigate(['/404']);
      return null;
    }
    return article;
  }
}
