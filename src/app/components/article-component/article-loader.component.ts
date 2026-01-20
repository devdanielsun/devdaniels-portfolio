import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { findLoaderBySlug } from '../../articles/articles.registery';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-loader',
  standalone: true,
  template: `<ng-container #vc></ng-container>`,
})
export class ArticleLoaderComponent implements OnInit {
  @ViewChild('vc', { read: ViewContainerRef, static: true })
  vc!: ViewContainerRef;

  private route = inject(ActivatedRoute);
  private title = inject(Title);

  async ngOnInit(): Promise<void> {
    const article = this.getArticleFromRoute();
    if (!article) {
      this.handleMissingArticle();
      return;
    }

    this.setPageTitle(article.title);
    await this.loadArticleComponent(article.slug);
  }

  private getArticleFromRoute(): Article | undefined {
    return this.route.snapshot.data['article'] as Article | undefined;
  }

  private setPageTitle(title?: string): void {
    if (title) {
      this.title.setTitle(`${title} - DevDaniels`);
    }
  }

  private handleMissingArticle(): void {
    console.warn('No article found in route data.');
    // TODO: display a "Not Found" message in the UI (optional)
  }

  private async loadArticleComponent(slug: string): Promise<void> {
    const loader = findLoaderBySlug(slug);
    if (!loader) {
      console.warn(`No loader found for slug: ${slug}`);
      return;
    }

    try {
      const comp = await loader();
      this.vc.clear();
      this.vc.createComponent(comp);
    } catch (e) {
      console.error('Failed to load article component', e);
      // TODO: display an error message in the UI (optional )
    }
  }
}
