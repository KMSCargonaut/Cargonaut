import {Component} from '@angular/core';
import {UserCargo} from "../../models/UserCargo";
import {UserService} from "../../services/user.service";
import {Tour} from "../../models/Tour";
import {TourService} from "../../services/tour.service";
import {ShareDataService} from "../../services/share-data.service";

@Component({
  selector: 'app-stranger-profile',
  templateUrl: './stranger-profile.component.html',
  styleUrls: ['./stranger-profile.component.css']
})
export class StrangerProfileComponent {

  user: UserCargo | null;
  firstname = '';
  lastname = '';
  username = '';
  age = -1;
  evaluation = -1;
  evaluationCounter = 0;
  gender = '';
  tours: Tour[] = [];
  offerTours: Tour[] = [];
  noOfferTours: Tour[] = [];
  goneWithNumber = 0;


  constructor(public userData: UserService, public tourData: TourService, public shareData: ShareDataService) {
    this.user = this.shareData.detailUser;
    this.fillValues().then();
  }

  async fillValues() {
    if (this.user != null) {
      this.firstname = this.user.firstname;
      this.lastname = this.user.lastname;
      this.username = this.user.username
      this.gender = this.user.gender;
      this.age = this.calcAge(new Date(this.user.birthday));
      console.log(this.age);
      this.evaluation = this.user.evaluation;
      this.evaluationCounter = this.user.evaluationCounter;
      this.tours = await this.tourData.getAllToursFromUser(this.user.uid)
      this.offerTours = this.tours.filter(tour => tour.isOffer)
        .filter(tour => !tour.areSeatsOccupied || !tour.isStorageFullyLoaded)
        .filter(tour => (new Date().getTime() - new Date(tour.date).getTime()) < 0);
      this.noOfferTours = this.tours.filter(tour => !tour.isOffer)
        .filter(tour => !tour.areSeatsOccupied || !tour.isStorageFullyLoaded)
        .filter(tour => (new Date().getTime() - new Date(tour.date).getTime()) < 0);
      await this.goneWith();
    }
  }

  calcAge(birthday: Date): number {
    return Math.floor((new Date().getTime() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365));
  }

  executedTours(): number {
    return this.tours
      .filter(tour => tour.isOffer)
      .filter(tour => tour.isBooked)
      .filter(tour => (new Date().getTime() - new Date(tour.date).getTime()) > 0).length
  }

  async goneWith() {
    let user = this.user;
    let length = 0;
    if (user != null) {
      const id = user.uid
      let bookedTours: Tour[] = await this.tourData.getAllBookedTours()
      if (bookedTours.length != 0) {
        for (const tour of bookedTours) {
          for (const passengers of tour.passengers) {
            if (passengers.id === id) {
              length += 1;
            }
          }
        }
      }
    }
    this.goneWithNumber = length;
  }

  openOfferTours(): number {
    return this.offerTours.length
  }

  openNoOfferTours(): number {
    return this.noOfferTours.length
  }


}
