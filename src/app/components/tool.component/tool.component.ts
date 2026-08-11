import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';
import { ContainerComponent } from '../container-component/container.component';
import { ToolMeta } from '../../models/tool.model';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-tool-component',
  imports: [ContainerComponent, RouterOutlet, RouterLink],
  templateUrl: './tool.component.html',
  styleUrl: './tool.component.scss',
})
export class ToolComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  get toolMeta(): ToolMeta | undefined {
    return this.route.snapshot.data['toolMeta'];
  }

  ngOnInit(): void {
    const t = this.toolMeta;
    if (t) {
      this.seo.update({
        title: t.title,
        description: t.shortDescription,
        url: `/tools/${t.slug}`,
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Tools', url: '/tools' },
          { name: t.title, url: `/tools/${t.slug}` },
        ],
      });
    }
  }
}
