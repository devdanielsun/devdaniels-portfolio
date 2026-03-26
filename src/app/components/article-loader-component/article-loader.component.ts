import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { marked, Renderer } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { ResolvedArticle } from '../../models/article.model';
import { SeoService } from '../../services/seo.service';

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
  imports: [],
  template: `<div class="markdown-content" [innerHTML]="sanitizedHtml"></div>`,
  styleUrls: ['./article-loader.component.scss'],
})
export class ArticleLoaderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  sanitizedHtml = '';

  async ngOnInit(): Promise<void> {
    const resolved = this.route.snapshot.data['article'] as
      | ResolvedArticle
      | undefined;
    if (!resolved) {
      console.warn('No article found in route data.');
      return;
    }
    const a = resolved.article;
    this.seo.update({
      title: a.title,
      description: a.shortDescription,
      url: `/articles/${a.slug}`,
      image: a.featuredImage?.srcPath,
      type: 'article',
      article: {
        author: a.author,
        publishedTime: a.startDate,
        tags: a.tags,
      },
    });
    const rawHtml = marked.parse(resolved.markdownContent) as string;
    if (isPlatformBrowser(this.platformId)) {
      const DOMPurify = (await import('dompurify')).default;
      this.sanitizedHtml = DOMPurify.sanitize(rawHtml, {
        ADD_ATTR: ['target'],
      });
    } else {
      this.sanitizedHtml = sanitizeHtml(rawHtml, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          a: ['href', 'title', 'target', 'rel'],
          img: ['src', 'alt', 'title', 'width', 'height'],
        },
      });
    }
  }
}
