import { Component, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidSkullCrossbones } from '@ng-icons/font-awesome/solid';
import { ContainerComponent } from '../../components/container-component/container.component';

@Component({
  selector: 'app-not-found-404-page',
  imports: [RouterLink, NgIconComponent, ContainerComponent],
  providers: [provideIcons({ faSolidSkullCrossbones })],
  templateUrl: './not-found-404.page.html',
  styleUrl: './not-found-404.page.scss',
})
export class NotFound404Page implements OnInit {
  private meta = inject(Meta);

  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'noindex' });
  }
}
