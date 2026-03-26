import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const SITE_NAME = 'DevDaniels';
const BASE_URL = 'https://devdaniels.com';
const DEFAULT_IMAGE = `${BASE_URL}/assets/images/devdanielsProfilePicture.jpg`;
const DEFAULT_DESCRIPTION =
  'Portfolio of Daniël Geerts (DevDaniels) — Software and DevOps engineer from the Netherlands.';

export interface PageMeta {
  title: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  article?: {
    author?: string;
    publishedTime?: string;
    tags?: string[];
  };
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);
  private document = inject(DOCUMENT);

  update(page: PageMeta): void {
    const fullTitle = `${page.title} - ${SITE_NAME}`;
    const description = page.description || DEFAULT_DESCRIPTION;
    const url = page.url ? `${BASE_URL}${page.url}` : BASE_URL;
    const image = page.image ? `${BASE_URL}/${page.image}` : DEFAULT_IMAGE;
    const type = page.type || 'website';

    // Basic
    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });

    // Canonical
    this.updateCanonical(url);

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });

    // Twitter Card
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({
      name: 'twitter:description',
      content: description,
    });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    // Article-specific OG tags
    if (type === 'article' && page.article) {
      if (page.article.author) {
        this.meta.updateTag({
          property: 'article:author',
          content: page.article.author,
        });
      }
      if (page.article.publishedTime) {
        this.meta.updateTag({
          property: 'article:published_time',
          content: page.article.publishedTime,
        });
      }
      page.article.tags?.forEach((tag) => {
        this.meta.updateTag({ property: 'article:tag', content: tag });
      });
    }

    // JSON-LD
    this.updateJsonLd(page, fullTitle, description, url, image);
  }

  private updateCanonical(url: string): void {
    let link = this.document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private updateJsonLd(
    page: PageMeta,
    title: string,
    description: string,
    url: string,
    image: string,
  ): void {
    // Remove existing JSON-LD
    const existing = this.document.querySelector(
      'script[type="application/ld+json"][data-seo]',
    );
    existing?.remove();

    const schema =
      page.type === 'article'
        ? {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description,
            url,
            image,
            author: {
              '@type': 'Person',
              name: page.article?.author || 'Daniël Geerts',
            },
            ...(page.article?.publishedTime && {
              datePublished: page.article.publishedTime,
            }),
          }
        : {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url,
            description,
            author: {
              '@type': 'Person',
              name: 'Daniël Geerts',
              jobTitle: 'Software/DevOps Engineer',
              url: BASE_URL,
            },
          };

    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-seo', 'true');
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
