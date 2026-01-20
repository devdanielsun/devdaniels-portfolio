export interface ArticleRouteData {
  article: Article;
}

export interface Article {
  published: boolean;
  slug: string;
  author: Author;
  title: string;
  date: string;
  shortDescription: string;
  category: string[];
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
  lable: string;
}

export enum Author {
  DanielGeerts = 'Daniël Geerts',
}
