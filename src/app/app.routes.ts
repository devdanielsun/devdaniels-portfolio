import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Portfolio } from './pages/portfolio/portfolio';
import { NotFound404 } from './pages/not-found-404/not-found-404';
import { PortfolioArticleComponent } from './modules/portfolio-article-component/portfolio-article-component';
import { ArticleResolver } from './resolvers/article.resolver';
import { ArticleLoaderComponent } from './modules/portfolio-article-component/article-loader.component';
// registry still exports the flat ARTICLES list for index or other uses
import { ARTICLES } from './articles/articles.registery';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home - DevDaniels', // Browser tab title
        data: {
            navTitle: 'Home'        // Navigation menu title
        }
    },
    {
        path: 'portfolio',
        component: Portfolio,
        title: 'Portfolio - DevDaniels', // Browser tab title
        data: {
            navTitle: 'Portfolio'        // Navigation menu title
        }
    },
    {
        path: 'articles',
        component: PortfolioArticleComponent,
        children: [
            {
                path: ':slug',
                component: ArticleLoaderComponent,
                resolve: { article: ArticleResolver }
            }
        ]
    },
    {
        path: '**',
        component: NotFound404,
        title: '404 Not Found - DevDaniels', // Browser tab title
    }
];

export default routes;