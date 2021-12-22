import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Tour} from "./models/Tour";
import {TourService} from "./services/tour.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cargonaut';

  constructor(private router: Router,private tour: TourService) {
    if (this.router.url === '/profil') {
      this.router.navigate(['/profil'])
    }
    if (this.router.url === '/carList'){
      this.router.navigate(['/carList'])
    }
    if(this.router.url === '/tours') {
      this.router.navigate(['/tours'])
    }
    if(this.router.url === '/createTours') {
      this.router.navigate(['/createTours'])
    }
    if(this.router.url === '/tour-details') {
      this.router.navigate(['/tour-details'])
    }
    if (this.router.url === '/exprofile') {
      this.router.navigate(['/exprofile']);
    }
  }
}
