import { Component, Input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-container-component',
  imports: [NgTemplateOutlet],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent {
  @Input() hideContainerView = false;
  @Input() containerTitle = '';
}
