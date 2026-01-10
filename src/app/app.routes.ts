import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Portfolio } from './pages/portfolio/portfolio';
import { NotFound404 } from './pages/not-found-404/not-found-404';
import { ArticleComponent } from './modules/article-component/article.component';
import { ArticleResolver } from './resolvers/article.resolver';
import { ArticleLoaderComponent } from './modules/article-component/article-loader.component';
import { ArticlesListComponent } from './articles/articles-list.component';
// registry still exports the flat ARTICLES list for index or other uses
import { ARTICLES } from './articles/articles.registery';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home - DevDaniels',
        data: { navTitle: 'Home' }
    },
    {
        path: 'portfolio',
        component: Portfolio,
        title: 'Portfolio - DevDaniels',
        data: { navTitle: 'Portfolio' }
    },
    {
        path: 'articles',
        children: [
            {
                path: '',
                component: ArticlesListComponent,
                title: 'Articles - DevDaniels'
            },
            {
                path: 'category/:category',
                component: ArticlesListComponent,
                title: 'Articles - DevDaniels'
            },
            {
                // make the portfolio wrapper the route component so its router-outlet hosts the article
                path: ':slug',
                component: ArticleComponent,
                children: [
                    {
                        path: '',
                        component: ArticleLoaderComponent,
                        resolve: { article: ArticleResolver }
                    }
                ]
            }
        ]
    },
    {
        path: '**',
        component: NotFound404,
        title: '404 Not Found - DevDaniels',
    }
];

export default routes;