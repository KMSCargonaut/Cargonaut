import {Component, OnInit} from '@angular/core';
import {TourService} from "../../services/tour.service";
import {Tour} from "../../models/Tour";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-tours',
  templateUrl: './create-tours.component.html',
  styleUrls: ['./create-tours.component.css']
})
export class CreateToursComponent {

  offer: boolean = false;
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
              private router: Router) {
  }


  offerOnOff() {
    this.offer = !this.offer;
    console.log(this.offer);
  }

  navigateToProfil() {
    this.router.navigate(['/profil']);
  }


  calculateEndTime() {
    if (this.startTime.trim().length > 0 && this.duration.trim().length > 0 && this.date.trim().length > 0) {
      let hours: number = Number.parseInt(this.startTime.substr(0, 2));
      let duration: number = Number.parseInt(this.duration);
      let endHours = hours + duration;
      let endDay = this.date.substr(8, 2);

      if (endHours >= 24) {
        endDay = (Number.parseInt(endDay) + 1).toString()
        if (endDay.trim().length < 2) { //Falls Datum in einer der ersten 9 Tage im Monat ist
          endDay = "0" + endDay;
        }
        endHours = endHours % 24;
      }

      if (endHours < 10) {
        this.endTime = this.date.substr(0, 8) + endDay + "T0" + endHours.toString();
      } else {
        this.endTime = this.date.substr(0, 8) + endDay + "T" + endHours.toString();
      }
      console.log(this.date);
      //021-12-02T18:47 so muss endTime aussehen
      //021-12-02
      this.endTime += this.startTime.substr(2, 3);
      console.log("Enduhrzeit: " + this.endTime);
    }
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
      this.offer,
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
      (this.offer)
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
