import {Component, OnInit} from '@angular/core';
import {Tour} from "../../models/Tour";
import {TourService} from "../../services/tour.service";
import {UserService} from "../../services/user.service";
import {UserCargo} from "../../models/UserCargo";
import {ActivatedRoute, Router} from "@angular/router";
import {Passenger} from "../../models/Passenger";
import {CalculateService} from "../../services/calculate.service";

@Component({
  selector: 'app-tour-list-generic',
  templateUrl: './tour-list-generic.component.html',
  styleUrls: ['./tour-list-generic.component.css']
})
export class TourListGenericComponent implements OnInit {

  list: Tour[] = [];
  user: UserCargo | null = null;
  sortNum : string = '0';
  isReversed: boolean = false;

  constructor(public tourData: TourService, public userData: UserService, public route: ActivatedRoute, public router: Router, public calc: CalculateService) {
  }

  async ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('uid');
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
          console.log('list case 0: ', this.list)
          break;
        }
        case 1: {
          this.list = await this.tourData.getAllBookedTours().then(tours => {
            return tours
              .filter(tour => (tour.driver === this.user?.uid || this.isPassenger(tour.passengers)) && tour.creator.uid != this.user?.uid);
          })
          break;
        }
        case 2: {
          this.list = await this.tourData.getAllBookedTours().then(tours => {
            return tours.filter(tour => tour.driver === this.user?.uid || this.isPassenger(tour.passengers));
          });
          this.list = this.list.filter(tour => !this.wasTourInPast(tour.date, tour.startTime))
          break;
        }
        case 3: {
          this.list = await this.tourData.getAllBookedTours().then(tours => {
            return tours.filter(tour => tour.driver === this.user?.uid || this.isPassenger(tour.passengers));
          })
          this.list = this.list.filter(tour => this.wasTourInPast(tour.date, tour.startTime))
          break;
        }
        case 4: {
          this.list = await this.tourData.getAllBookedTours();
          this.list = this.list.filter(tour => tour.driver === this.user?.uid);
          break;
        }
        case 5: {
          this.list = await this.tourData.getAllBookedTours();
          this.list = this.list.filter(tour => this.isPassenger(tour.passengers));
          break;
        }
      }
    await this.sortList();
    }
  }

  async sortList() {
    const sort = Number.parseInt(this.sortNum);
    switch (sort) {
      case 0: this.list = this.tourData.sortIsOffer(this.list); break;
      case 1: this.list = this.tourData.sortIsBooked(this.list); break;
      case 2: this.list = this.tourData.sortStatus(this.list); break;
      case 3: this.list = this.tourData.sortStartCity(this.list); break;
      case 4: this.list = this.tourData.sortEndCity(this.list); break;
      case 5: this.list = this.tourData.sortDate(this.list); break;
      case 6: this.list = this.tourData.sortDuration(this.list); break;
      case 7: this.list = this.tourData.sortStorage(this.list); break;
      case 8: this.list = this.tourData.sortSeats(this.list); break;
      case 9: this.list = this.tourData.sortPrice(this.list); break;
      case 10: this.list = this.tourData.sortCreator(this.list); break
    }
  }

  reverseList() {
    this.isReversed = !this.isReversed;
    this.list = this.list.reverse();
  }

  navigateToProfile() {
    this.router.navigate(['/profil']);
  }

  wasTourInPast(date: string, time: string): boolean {
    const newDate = new Date().getTime();
    const oldDate = new Date(this.calc.arrivalTime(time, '0', date));
    console.log('new: ', newDate)
    console.log('old: ', oldDate)
    console.log('subtr: ', newDate - oldDate.getTime())
    return (newDate - oldDate.getTime()) > 0;
  }

  isPassenger(passengers: Passenger[]): boolean {
    return passengers.some(passenger => passenger.id === this.user?.uid);
  }


}
