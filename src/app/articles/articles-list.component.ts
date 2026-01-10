import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ARTICLES, findArticlesByCategory, listCategories } from './articles.registery';
import { ContainerComponent } from '../modules/container-component/container-component';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ContainerComponent],
  templateUrl: './articles-list.component.html'
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
    // ...existing code...
  }

  // used by the template
  items() {
    return this.currentCategory ? findArticlesByCategory(this.currentCategory) : ARTICLES;
  }

  categories() {
    return listCategories();
  }
}
