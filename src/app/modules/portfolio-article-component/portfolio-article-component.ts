import { Component, inject, computed, } from '@angular/core';
import { ActivatedRoute, RouterOutlet, Router, NavigationEnd} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { ContainerComponent } from "../container-component/container-component";
import { ArticleRouteData } from '../../models/article.model';

@Component({
  selector: 'app-portfolio-article-component',
  imports: [ContainerComponent, RouterOutlet],
  templateUrl: './portfolio-article-component.html',
  styleUrl: './portfolio-article-component.scss'
})
export class PortfolioArticleComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // signal that updates on navigation end
  private navigation = toSignal(
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)),
    { requireSync: false }
  );

  // read deepest child snapshot data on navigation
  article = computed(() => {
    // consume navigation signal to recompute when route changes
    this.navigation;
    let r: ActivatedRoute | null = this.route;
    while (r?.firstChild) {
      r = r.firstChild;
    }
    return (r?.snapshot.data as ArticleRouteData | undefined)?.article;
  });
}
