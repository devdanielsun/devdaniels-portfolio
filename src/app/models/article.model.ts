export interface ArticleRouteData {
  article: Article;
}

export interface Article {
  slug: string;
  title: string;
  date: string;
  shortDescription: string;
  category: string[];
  featuredImage: FeaturedImage | undefined;
  //tags: string[];
  //author: string;
}

interface FeaturedImage {
  altText: string;
  srcPath: string;
}
