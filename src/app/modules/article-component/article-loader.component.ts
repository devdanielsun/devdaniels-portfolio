import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private title: Title,
  ) {}

  async ngOnInit(): Promise<void> {
    const article = this.route.snapshot.data['article'] as Article | undefined;
    if (article?.title) {
      this.title.setTitle(`${article.title} - DevDaniels`);
    }
    if (!article) return;
    const loader = findLoaderBySlug(article.slug);
    if (!loader) return;
    try {
      const comp = await loader();
      // create the article component inside this outlet
      this.vc.clear();
      this.vc.createComponent(comp as any);
    } catch (e) {
      // swallow — resolver should have already validated
      console.error('Failed to load article component', e);
    }
  }
}
