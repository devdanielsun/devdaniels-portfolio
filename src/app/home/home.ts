import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [
    MatSlideToggleModule,
    MatButton
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
