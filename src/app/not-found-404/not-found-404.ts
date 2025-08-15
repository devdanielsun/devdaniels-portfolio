import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ContainerComponent } from '../modules/container-component/container-component';

@Component({
  selector: 'app-not-found-404',
  imports: [
    RouterLink,
    FontAwesomeModule,
    ContainerComponent
],
  templateUrl: './not-found-404.html',
  styleUrl: './not-found-404.scss'
})
export class NotFound404 {
  protected readonly faSkullCrossbones = faSkullCrossbones;
}
