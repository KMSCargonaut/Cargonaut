import {Component, OnInit} from '@angular/core';
import {Tour} from "../../models/Tour";
import {TourService} from "../../services/tour.service";
import {UserService} from "../../services/user.service";
import {UserCargo} from "../../models/UserCargo";
import {ActivatedRoute, Router} from "@angular/router";
import {Passenger} from "../../models/Passenger";

@Component({
  selector: 'app-tour-list-generic',
  templateUrl: './tour-list-generic.component.html',
  styleUrls: ['./tour-list-generic.component.css']
})
export class TourListGenericComponent implements OnInit {

  list: Tour[] = [];
  user: UserCargo | null = null;

  constructor(public tourData: TourService, public userData: UserService, public route: ActivatedRoute, public router: Router) {
  }

  async ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    const tempUser = (userId) ? await this.userData.getUser(userId) : null;
    this.user = (tempUser) ? tempUser : null;
    await this.fillList('0');
  }

  async fillList(value: string) {
    const listNum = Number.parseInt(value);

    if (this.user) {
      switch (listNum) {
        case 0: {
          this.list = await this.tourData.getAllToursFromUser(this.user.uid);
          this.list = this.list.filter(tour => !tour.isOffer)
          console.log(this.list)
          break;
        }
        case 1: {
          this.list = await this.tourData.getAllToursFromUser(this.user.uid).then(tour => {
            return tour.filter(tour => tour.isOffer);
          });
          break;
        }
        case 2: {
          const listAsDriver = await this.tourData.getAllBookedTours().then(tours => {
            return tours.filter(tour => tour.driver === this.user?.uid);
          })
          this.list = listAsDriver
            .filter(tour => !tour.isOffer)
            .filter(tour => tour.creatorID != this.user?.uid);
          console.log('list case 2: ', this.list);
          break;
        }
        case 3: {
          const listAsPassenger = await this.tourData.getAllBookedTours().then(tours => {
            return tours.filter(tour => this.isPassenger(tour.passengers));
          })
          this.list = listAsPassenger
            .filter(tour => tour.isOffer)
            .filter(tour => tour.creatorID != this.user?.uid);
          console.log('list case 3: ', this.list);
          break;
        }


      }


    }
  }

  navigateToProfile() {
    this.router.navigate(['/profil']);
  }

 /* wasTourInPast(date: string): boolean {
    return (new Date().getTime() - new Date(date).getTime()) > 0;
  }*/

  isPassenger(passengers: Passenger[]): boolean {
    return passengers.some(passenger => passenger.id === this.user?.uid);
  }
}
