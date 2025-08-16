import { Component } from '@angular/core';
import { ContainerComponent } from "../modules/container-component/container-component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  imports: [ContainerComponent],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class Portfolio {

  constructor(private router: Router) {}

  goToProject(projectUri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([projectUri]);
    });
  }
}
