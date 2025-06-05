import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { CodeertsComponent } from './components/projects/codeerts/codeerts.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'codeerts', component: CodeertsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
