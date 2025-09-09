import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Portfolio } from './portfolio/portfolio';
import { NotFound404 } from './not-found-404/not-found-404';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home - DevDaniëls', // Browser tab title
        data: {
            navTitle: 'Home'        // Navigation menu title
        }
    },
    {
        path: 'portfolio',
        component: Portfolio,
        title: 'Portfolio - DevDaniëls', // Browser tab title
        data: {
            navTitle: 'Portfolio'        // Navigation menu title
        }
    },
    {
        path: '404',
        component: NotFound404,
        title: '404 Not Found - DevDaniëls', // Browser tab title
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];

export default routes;