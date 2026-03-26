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
  breadcrumbs?: { name: string; url: string }[];
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
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

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
    this.document
      .querySelectorAll('script[type="application/ld+json"][data-seo]')
      .forEach((el) => el.remove());

    const schemas: object[] = [];

    if (page.type === 'article') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url,
        image,
        inLanguage: 'en',
        author: {
          '@type': 'Person',
          name: page.article?.author || 'Daniël Geerts',
          url: BASE_URL,
        },
        publisher: {
          '@type': 'Person',
          name: 'Daniël Geerts',
          url: BASE_URL,
        },
        ...(page.article?.publishedTime && {
          datePublished: page.article.publishedTime,
        }),
        ...(page.article?.tags?.length && {
          keywords: page.article.tags.join(', '),
        }),
      });
    } else {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url,
        description,
        inLanguage: 'en',
        author: {
          '@type': 'Person',
          name: 'Daniël Geerts',
          jobTitle: 'Software/DevOps Engineer',
          url: BASE_URL,
          sameAs: [
            'https://github.com/devdanielsun',
            'https://www.linkedin.com/in/danielgeerts/',
          ],
        },
      });
    }

    // Breadcrumb structured data
    if (page.breadcrumbs?.length) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: page.breadcrumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: `${BASE_URL}${crumb.url}`,
        })),
      });
    }

    schemas.forEach((schema) => {
      const script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo', 'true');
      script.textContent = JSON.stringify(schema);
      this.document.head.appendChild(script);
    });
  }
}
