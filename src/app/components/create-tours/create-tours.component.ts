import { Component, OnInit } from '@angular/core';
import {TourService} from "../../services/tour.service";
import {Tour} from "../../models/Tour";
import {UserService} from "../../services/user.service";

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


  constructor(public tourData: TourService, public userData: UserService) {

  }


  offerOnOff() {
    this.offer = !this.offer;
    console.log(this.offer);
  }


  showTime(time: string) {
    console.log("Time: " , time, "Type of: ", typeof time);
    let hours: number = Number.parseInt(time.substr(0,2));
    let minutes: number = Number.parseInt(time.substr(3,2));
    console.log("hours: ", hours, "minutes: ", minutes, "type of: ", typeof hours, typeof minutes)
    const temptime = Number.parseInt(time);
    console.log("Time as number: ", temptime, "Type of:  ", typeof temptime)
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
    if(this.userData.currUser) {
    (this.offer)
      ? tempTour.driver = this.userData.currUser.uid
      : tempTour.passengers[0] = this.userData.currUser.uid;
      await this.tourData.addTour(tempTour);
    } else {

    }
  }

}
