import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ArticlesService } from '../../services/articles.service';
import { ContainerComponent } from '../../components/container-component/container.component';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-articles-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ContainerComponent],
  templateUrl: './articles-list.page.html',
  styleUrls: ['./articles-list.page.scss'],
})
export class ArticlesListPage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private articlesService = inject(ArticlesService);
  private routeSub?: Subscription;

  @Input() hideContainerView = false;
  @Input() hideTitle = false;
  @Input() hideCategoryNav = false;
  @Input() maxItemsToShow?: number;

  currentCategory?: string;
  items: Article[] = [];
  categories: string[] = [];

  ngOnInit(): void {
    this.subscribeToRouteParams();
    this.loadCategories();
    this.loadArticles();
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
      .subscribe((articles: Article[]) => {
        this.items = articles;
      });
  }

  private loadCategories(): void {
    this.articlesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
