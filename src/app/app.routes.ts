import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Portfolio } from './portfolio/portfolio';
import { NotFound404 } from './not-found-404/not-found-404';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'DevDaniels - Home'
    },
    {
        path: 'portfolio',
        component: Portfolio,
        title: 'DevDaniels - Portfolio'
    },
    {
        path: '404',
        component: NotFound404,
        title: 'DevDaniels - 404 Not Found'
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];

export default routes;