import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {TourService} from "./services/tour.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cargonaut';


  constructor(private router: Router, public tourTest: TourService) {
    if (this.router.url === '/profil') {
      this.router.navigate(['/profil'])
    }

    this.test()
  }

  async test() {
    await this.tourTest.searchTours(false, 'München', 'Berlin', '1996-06-14', 1, 1).then(tour => console.log(tour))
  }

}
