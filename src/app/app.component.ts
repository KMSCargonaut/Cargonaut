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
  tours: Tour[] = [];


  constructor(private router: Router,private tour: TourService) {
    if (this.router.url === '/profil') {
      this.router.navigate(['/profil'])
    }
    if (this.router.url === '/carList'){
      this.router.navigate(['/carList'])
    }
    if(this.router.url === '/createTours') {
      this.router.navigate(['/createTours'])
    }

    this.test()
  }

  async test(){
    await this.tour.getAllTours().then((tours) => {
      this.tours = [...tours]
    })
  }

}
