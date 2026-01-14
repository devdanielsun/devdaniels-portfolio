import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ArticlesService } from '../../services/articles.service';
import { ContainerComponent } from '../container-component/container.component';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ContainerComponent],
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private articlesService = inject(ArticlesService);
  private routeSub?: Subscription;

  @Input() hideContainerView: boolean = false;
  @Input() hideTitle: boolean = false;
  @Input() hideCategoryNav: boolean = false;
  @Input() maxItemsToShow?: number;

  currentCategory?: string;
  items: any[] = [];
  categories: string[] = [];

  ngOnInit(): void {
    this.subscribeToRouteParams();
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private subscribeToRouteParams(): void {
    this.routeSub = this.route.paramMap.subscribe((paramMap) => {
      this.currentCategory = paramMap.get('category') || undefined;
      this.loadArticles();
    });
  }

  private loadArticles(): void {
    this.articlesService
      .getArticles(this.currentCategory)
      .subscribe((articles) => {
        this.items = articles;
      });
  }

  private loadCategories(): void {
    this.articlesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
