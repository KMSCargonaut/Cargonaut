import {Component, Predicate} from '@angular/core';
import {Router} from "@angular/router";
import {TourService} from "./services/tour.service";
import {Tour} from "./models/Tour";


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
    await this.tourTest.searchTours(true, 'Frankfurt', 'Köln', 'egal', 1, 1).then(tour => console.log(tour))
  }

}
