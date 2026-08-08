import { Routes } from '@angular/router';
import { PortfolioPage } from './pages/portfolio-page/portfolio.page';
import { NotFound404Page } from './pages/not-found-404-page/not-found-404.page';
import { ArticlesListPage } from './pages/article-list-page/articles-list.page';
import { ArticleComponent } from './components/article-component/article.component';
import { articleResolver } from './resolvers/article.resolver';
import { ArticleLoaderComponent } from './components/article-loader-component/article-loader.component';
import { ToolsListPage } from './pages/tools-list-page/tools-list.page';
import { ToolComponent } from './components/tool.component/tool.component';
import { TOOLS } from './tools/tools.registry';

export const routes: Routes = [
  {
    path: '',
    component: PortfolioPage,
    title: 'Portfolio - DevDaniels',
    data: { navTitle: 'Portfolio' },
  },
  {
    path: 'articles',
    title: 'Articles - DevDaniels',
    data: { navTitle: 'Articles' },
    children: [
      {
        path: '',
        component: ArticlesListPage,
      },
      {
        path: 'category/:category',
        component: ArticlesListPage,
        title: 'Articles - DevDaniels',
      },
      {
        // make the portfolio wrapper the route component so its router-outlet hosts the article
        path: ':slug',
        component: ArticleComponent,
        children: [
          {
            path: '',
            component: ArticleLoaderComponent,
            resolve: { article: articleResolver },
          },
        ],
      },
    ],
  },
  {
    path: 'tools',
    title: 'Tools - DevDaniels',
    data: { navTitle: 'Tools' },
    children: [
      {
        path: '',
        component: ToolsListPage,
      },
      ...TOOLS.map((tool) => ({
        path: tool.slug,
        component: ToolComponent,
        title: `${tool.title} - DevDaniels`,
        data: { toolMeta: tool },
        children: [
          {
            path: '',
            loadComponent: tool.loadComponent,
          },
        ],
      })),
    ],
  },
  {
    path: '**',
    component: NotFound404Page,
    title: '404 Not Found - DevDaniels',
  },
];

export default routes;
