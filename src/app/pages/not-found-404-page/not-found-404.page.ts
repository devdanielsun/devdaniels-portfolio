import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContainerComponent } from '../../components/container-component/container.component';

@Component({
  selector: 'app-not-found-404-page',
  imports: [RouterLink, FontAwesomeModule, ContainerComponent],
  templateUrl: './not-found-404.page.html',
  styleUrl: './not-found-404.page.scss',
})
export class NotFound404Page {
  protected readonly faSkullCrossbones = faSkullCrossbones;
}
