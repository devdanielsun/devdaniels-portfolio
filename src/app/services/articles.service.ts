import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ARTICLES,
  findArticlesByCategory,
  listCategories,
} from '../articles/articles.registery';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  getArticles(category?: string): Observable<any[]> {
    const source = category ? findArticlesByCategory(category) : ARTICLES;
    return of(
      [...source].sort(
        (a, b) => this.extractYear(b.date) - this.extractYear(a.date),
      ),
    );
  }

  getCategories(): Observable<string[]> {
    return of(listCategories());
  }

  private extractYear(dateStr?: string): number {
    if (!dateStr) return 0;
    const match = dateStr.match(/(\d{4})/);
    return match ? parseInt(match[1], 10) : 0;
  }
}
