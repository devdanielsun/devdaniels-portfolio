import { Component } from '@angular/core';
import { Article } from '../../models/article.model';

export const POLLOR_ARTICLE: Article = {
  published: false,
  title: 'Pollor',
  shortDescription: 'In dit artikel vertel ik over het project genaamd Pollor. Dit is een platform waar gebruikers enquêtes kunnen maken en delen, waarbij de nadruk ligt op anoniem stemmen. Ik bespreek de gebruikte technologieën, uitdagingen tijdens de ontwikkeling en de behaalde resultaten.',
  date: '2023 t/m heden',
  category: ['Project', 'Hobby', 'Web Development', 'Angular', 'C# .NET', 'Azure'],
  featuredImage: {
    altText: 'Pollor Logo',
    srcPath: 'assets/images/portfolio/pollor/pollor-logo.png'
  },
  slug: 'pollor',
};

@Component({
  selector: 'app-pollor.article',
  templateUrl: './pollor.article.html',
})
export class PollorArticle {

}
