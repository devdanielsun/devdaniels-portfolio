export interface ArticleRouteData {
  article: Article;
}

export interface Article {
  published: boolean;
  slug: string;
  author: Author;
  title: string;
  startDate: string;
  endDate?: string;
  shortDescription: string;
  categories: string[];
  featuredImage?: FeaturedImage;
  githubRepo?: GithubRepo;
  tags?: string[];
}

interface FeaturedImage {
  altText: string;
  srcPath: string;
}

interface GithubRepo {
  link: string;
  label: string;
}

export enum Author {
  DanielGeerts = 'Daniël Geerts',
}
