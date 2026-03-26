import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { marked, Renderer } from 'marked';
import DOMPurify from 'dompurify';
import { ResolvedArticle } from '../../models/article.model';

const renderer = new Renderer();
renderer.link = ({ href, title, text }) => {
  const isExternal = href?.startsWith('http');
  const titleAttr = title ? ` title="${title}"` : '';
  if (isExternal) {
    return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer nofollow">${text}</a>`;
  }
  return `<a href="${href}"${titleAttr}>${text}</a>`;
};
marked.use({ renderer });

@Component({
  selector: 'app-article-loader',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="markdown-content" [innerHTML]="sanitizedHtml"></div>`,
  styleUrls: ['./article-loader.component.scss'],
})
export class ArticleLoaderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private title = inject(Title);

  sanitizedHtml = '';

  ngOnInit(): void {
    const resolved = this.route.snapshot.data['article'] as
      | ResolvedArticle
      | undefined;
    if (!resolved) {
      console.warn('No article found in route data.');
      return;
    }
    this.title.setTitle(`${resolved.article.title} - DevDaniels`);
    const rawHtml = marked.parse(resolved.markdownContent) as string;
    this.sanitizedHtml = DOMPurify.sanitize(rawHtml, {
      ADD_ATTR: ['target'],
    });
  }
}
