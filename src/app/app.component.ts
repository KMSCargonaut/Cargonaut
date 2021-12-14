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


    this.test().then((tour) => {
      console.log('test 1: ', tour);

    })

    this.test2().then(tour => {
      console.log('test 2: ', tour)
    })

    this.test3().then(tour => console.log(tour));

    this.test4().then(tour => console.log(tour));
  }

  async test(): Promise<Tour[]>{
    /*await this.tourTest.addTour(new Tour('hihi'))
    await this.tourTest.addTour(new Tour('test lol'))*/
    let pre: Predicate<Tour> = () => true;
    return await this.tourTest.getFiltleredTours(pre);
  }

  async test2(): Promise<Tour[]>{
    return await this.tourTest.getAllTours();
  }

  async test3() {
    return await this.tourTest.test('hihi');
  }

  async test4() {
    return await this.tourTest.test1('hihi', 'PEQG58A0fXi1OJ5XlSNW')
  }



}
