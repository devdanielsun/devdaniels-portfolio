import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ARTICLES, findArticlesByCategory, listCategories } from './articles.registery';
import { ContainerComponent } from '../modules/container-component/container-component';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ContainerComponent],
  templateUrl: './articles-list.component.html'
})
export class ArticlesListComponent {
  private route = inject(ActivatedRoute);

  categories = signal(listCategories());

  items = computed(() => {
    const cat = this.route.snapshot.paramMap.get('category');
    if (!cat) return ARTICLES;
    return findArticlesByCategory(cat);
  });
}
