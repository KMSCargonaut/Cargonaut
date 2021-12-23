import { Component, OnInit } from '@angular/core';
import {UserCargo} from "../../models/UserCargo";
import {UserService} from "../../services/user.service";
import {Tour} from "../../models/Tour";
import {TourService} from "../../services/tour.service";

@Component({
  selector: 'app-stranger-profile',
  templateUrl: './stranger-profile.component.html',
  styleUrls: ['./stranger-profile.component.css']
})
export class StrangerProfileComponent {

  user: UserCargo | undefined;
  firstname = '';
  lastname = '';
  username = '';
  age = -1;
  evaluation = -1;
  gender = ''
  offerTours: Tour[] = []
  noOfferTours: Tour[] = []


  constructor(public userData: UserService, public tourData: TourService) {
    this.test();
  }

  async test() {
    this.user = await this.userData.getUser('dObSN5uiq6RIPExAhIOMCgMVD8p2');
    if (this.user != undefined) {
      this.firstname = this.user.firstname;
      this.lastname = this.user.lastname;
      this.username = this.user.username
      this.gender = this.user.gender;
      this.age = this.calcAge(new Date(this.user.birthday));
      console.log(this.age);
      this.evaluation = this.user.evaluation;
      const tours = await this.tourData.getAllOpenToursFromUser(this.user.uid)
      this.offerTours = tours.filter(tour => tour.offer);
      this.noOfferTours = tours.filter(tour => !tour.offer);
      console.log(this.offerTours)
      console.log(this.noOfferTours)
    }
  }

  calcAge(birthday: Date): number {
      return Math.floor((new Date().getTime() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365));
  }

}
