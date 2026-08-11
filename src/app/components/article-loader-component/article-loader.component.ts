import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { marked, Renderer } from 'marked';
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
  imports: [],
  template: `<div class="markdown-content" [innerHTML]="sanitizedHtml"></div>`,
  styleUrls: ['./article-loader.component.scss'],
})
export class ArticleLoaderComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);
  private meta = inject(Meta);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  sanitizedHtml = '';

  async ngOnInit(): Promise<void> {
    const resolved = this.route.snapshot.data['article'] as
      ResolvedArticle | undefined;
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
        modifiedTime: a.endDate,
        tags: a.tags,
      },
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Articles', url: '/articles' },
        { name: a.title, url: `/articles/${a.slug}` },
      ],
    });
    this.setArticleTags(a.author, a.startDate, a.tags);
    const rawHtml = marked.parse(resolved.markdownContent) as string;
    if (isPlatformBrowser(this.platformId)) {
      const DOMPurify = (await import('dompurify')).default;
      this.sanitizedHtml = DOMPurify.sanitize(rawHtml, {
        ADD_ATTR: ['target'],
      });
    } else {
      const { default: sanitizeHtml } = await import('sanitize-html');
      this.sanitizedHtml = sanitizeHtml(rawHtml, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          a: ['href', 'title', 'target', 'rel'],
          img: ['src', 'alt', 'title', 'width', 'height'],
        },
      });
    }
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.clearArticleTags();
  }

  private setArticleTags(
    author?: string,
    publishedTime?: string,
    tags?: string[],
  ): void {
    if (author) {
      this.meta.addTag({ property: 'article:author', content: author });
    }
    if (publishedTime) {
      this.meta.addTag({
        property: 'article:published_time',
        content: publishedTime,
      });
    }
    tags?.forEach((tag) => {
      this.meta.addTag({ property: 'article:tag', content: tag });
    });
  }

  private clearArticleTags(): void {
    this.meta.removeTag("property='article:author'");
    this.meta.removeTag("property='article:published_time'");
    this.meta.getTags("property='article:tag'").forEach((el) => {
      this.meta.removeTagElement(el);
    });
  }
}
