import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from '../../components/container-component/container.component';
import { TOOLS } from '../../tools/tools.registry';
import { ToolMeta } from '../../models/tool.model';
import { SeoService } from '../../services/seo.service';

type SortOption = 'name-asc' | 'name-desc';

@Component({
  selector: 'app-tools-list-page',
  imports: [ContainerComponent, RouterLink, FormsModule],
  templateUrl: './tools-list.page.html',
  styleUrl: './tools-list.page.scss',
})
export class ToolsListPage implements OnInit {
  private seo = inject(SeoService);

  searchQuery = signal('');
  sortOption = signal<SortOption>('name-asc');
  selectedCategory = signal<string | null>(null);

  categories = computed(() => {
    const set = new Set<string>();
    TOOLS.forEach((t) => t.categories.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  });

  filteredTools = computed<ToolMeta[]>(() => {
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();
    const sort = this.sortOption();

    let tools = TOOLS.filter((t) => {
      const matchesSearch =
        !query ||
        t.title.toLowerCase().includes(query) ||
        t.shortDescription.toLowerCase().includes(query);
      const matchesCategory = !category || t.categories.includes(category);
      return matchesSearch && matchesCategory;
    });

    tools = [...tools].sort((a, b) => {
      const cmp = a.title.localeCompare(b.title);
      return sort === 'name-desc' ? -cmp : cmp;
    });

    return tools;
  });

  ngOnInit(): void {
    this.seo.update({
      title: 'Tools',
      description:
        'Free online developer tools by Daniël Geerts (DevDaniels) — QR code generator, and more.',
      url: '/tools',
    });
  }

  onSearchInput(value: string): void {
    this.searchQuery.set(value);
  }

  onSortChange(value: string): void {
    this.sortOption.set(value as SortOption);
  }

  onCategorySelect(category: string | null): void {
    this.selectedCategory.set(category);
  }
}
