import {Component, OnInit} from '@angular/core';
import {TourService} from "../../services/tour.service";
import {Tour} from "../../models/Tour";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";
import {CalculateService} from "../../services/calculate.service";

@Component({
  selector: 'app-create-tours',
  templateUrl: './create-tours.component.html',
  styleUrls: ['./create-tours.component.css']
})
export class CreateToursComponent {

  isOffer: boolean = true;
  startCity = '';
  endCity = '';
  startTime = '';
  duration = '';
  endTime = '';
  date = '';
  seats = '';
  storage = '';
  price = '';
  description = '';


  constructor(public tourData: TourService, public userData: UserService, public alert: AlertService,
              private router: Router, private calcService: CalculateService) {
  }


  navigateToProfil() {
    this.router.navigate(['/profil']);
  }

  offerOnOff() {
    this.isOffer = !this.isOffer;
    console.log(this.isOffer);
  }

  calculateEndTime() {
    this.endTime = this.calcService.arrivalTime(this.startTime, this.duration, this.date)
  }

  value(val: any) {
    console.log('prica: ', val, ', ', typeof val);
  }

  async checkInput() {
    if (
      this.startTime.trim().length > 0 &&
      this.endCity.trim().length > 0 &&
      this.startTime.trim().length > 0 &&
      this.duration.trim().length > 0 &&
      this.date.trim().length > 0 &&
      this.seats.trim().length > 0 &&
      this.storage.trim().length > 0 &&
      Number.parseInt(this.price) > 0
    ) {
      await this.addTour();
    } else {
      this.alert.showAlert({type: 'danger', message: 'Alle Felder ausfüllen!'})
    }
  }


  async addTour() {
    let tempTour = new Tour(
      this.isOffer,
      this.startCity,
      this.endCity,
      this.startTime,
      Number.parseInt(this.duration),
      this.date,
      Number.parseInt(this.price),
      Number.parseInt(this.storage),
      Number.parseInt(this.seats),
      this.description
    );
    if (this.userData.currUser) {
      (this.isOffer)
        ? tempTour.driver = this.userData.currUser.uid
        : tempTour.passengers[0] = this.userData.currUser.uid;
      await this.tourData.addTour(tempTour);
      this.clearInputs();
    }
  }

  clearInputs() {
    this.startCity = '';
    this.endCity = '';
    this.startTime = '';
    this.duration = '';
    this.date = '';
    this.price = '';
    this.storage = '';
    this.seats = '';
    this.description = '';
  }

}
