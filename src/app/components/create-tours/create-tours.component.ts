import { Component, OnInit } from '@angular/core';
import {Time} from "@angular/common";

@Component({
  selector: 'app-create-tours',
  templateUrl: './create-tours.component.html',
  styleUrls: ['./create-tours.component.css']
})
export class CreateToursComponent {

  on: boolean = false;
  startCity = '';
  endCity = '';
  startTime: Time = {hours: 12, minutes: 11};
  endTime: Time = {hours: 18, minutes: 39};
  date = new Date();
  duration = 0;


  constructor() { }

  durationCalc() {
    // this.duration = Number.valueOf() - this.startTime.hours.valueOf()
    console.log(this.duration)
  }

  valueInput() {
    this.on = !this.on;
    console.log(this.on);
  }

  showDate() {
    console.log(this.date)
  }
}
