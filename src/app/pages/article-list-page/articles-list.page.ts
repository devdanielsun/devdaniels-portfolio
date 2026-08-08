import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { ArticlesService } from '../../services/articles.service';
import { ContainerComponent } from '../../components/container-component/container.component';
import { Article } from '../../models/article.model';
import { isDevMode } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-articles-list-page',
  imports: [SlicePipe, RouterLink, ContainerComponent],
  templateUrl: './articles-list.page.html',
  styleUrls: ['./articles-list.page.scss'],
})
export class ArticlesListPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articlesService = inject(ArticlesService);
  private seo = inject(SeoService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  protected isDevMode = isDevMode();

  @Input() onlyShowArticles = false;
  @Input() maxItemsToShow?: number;
  @Input() centerItems = false;

  currentCategory?: string;
  items: Article[] = [];
  categories: string[] = [];

  ngOnInit(): void {
    if (!this.onlyShowArticles) {
      this.seo.update({
        title: 'Articles',
        description:
          'Articles and project write-ups by Daniël Geerts (DevDaniels) covering software engineering, DevOps, and web development.',
        url: '/articles',
      });
    }
    this.subscribeToRouteParams();
    this.loadCategories();
    this.loadArticles();
  }

  private subscribeToRouteParams(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((paramMap) => {
        this.currentCategory = paramMap.get('category') || undefined;
        if (this.currentCategory && !this.onlyShowArticles) {
          this.seo.update({
            title: `${this.currentCategory} Articles`,
            description: `Articles about ${this.currentCategory} by Daniël Geerts (DevDaniels).`,
            url: `/articles/category/${this.currentCategory}`,
          });
        }
        this.loadArticles();
      });
  }

  private loadArticles(): void {
    this.articlesService
      .getArticles(this.currentCategory)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((articles: Article[]) => {
        this.items = articles;
        this.cdr.markForCheck();
      });
  }

  private loadCategories(): void {
    this.articlesService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((categories) => {
        this.categories = categories;
        this.cdr.markForCheck();
      });
  }

  navigateToArticle(articleSlug: string): void {
    this.router.navigate(['/articles', articleSlug]);
  }

  navigateToCategory(category: string | null): void {
    if (category) {
      this.router.navigate(['/articles/category', category]);
    } else {
      this.router.navigate(['/articles']);
    }
  }
}
