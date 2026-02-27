import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container-component',
  imports: [CommonModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent {
  @Input() hideContainerView = false;
  @Input() containerTitle = '';
}
