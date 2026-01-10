import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'container-component',
  imports: [CommonModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent {
  @Input() fullWidth: boolean = false;
  @Input() hideContainerView: boolean = false;
}
