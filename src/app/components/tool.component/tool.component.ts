import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';
import { ContainerComponent } from '../container-component/container.component';
import { ToolMeta } from '../../models/tool.model';

@Component({
  selector: 'app-tool-component',
  imports: [ContainerComponent, RouterOutlet, RouterLink],
  templateUrl: './tool.component.html',
  styleUrl: './tool.component.scss',
})
export class ToolComponent {
  private route = inject(ActivatedRoute);

  get toolMeta(): ToolMeta | undefined {
    return this.route.snapshot.data['toolMeta'];
  }
}
