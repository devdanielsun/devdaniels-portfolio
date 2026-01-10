import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ARTICLES, findArticlesByCategory, listCategories } from '../../articles/articles.registery';
import { ContainerComponent } from '../container-component/container.component';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ContainerComponent],
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);

  private routeSub?: Subscription;
  private currentCategory?: string;

  constructor() {}

  ngOnInit(): void {
    // subscribe so the component updates when :category changes
    this.routeSub = this.route.paramMap.subscribe(pm => {
      this.currentCategory = pm.get('category') || undefined;
      // If you have any cached items/state, refresh it here or call change detection.
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  items() {
    const source = this.currentCategory ? findArticlesByCategory(this.currentCategory) : ARTICLES;
    // return a sorted copy (newest first) by extracting the first year found in the `date` string
    return [...source].sort((a, b) => this.extractYear(b.date) - this.extractYear(a.date));
  }

  private extractYear(dateStr?: string): number {
    if (!dateStr) return 0;
    const m = dateStr.match(/(\d{4})/);
    return m ? parseInt(m[1], 10) : 0;
  }

  categories() {
    return listCategories();
  }
}
