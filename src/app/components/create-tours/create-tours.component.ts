import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-tours',
  templateUrl: './create-tours.component.html',
  styleUrls: ['./create-tours.component.css']
})
export class CreateToursComponent {

  on: boolean = false;
  startCity = '';
  endCity = '';
  startTime = '';
  duration = '';
  endTime = '';
  date = '';
  seats = '';
  storage = '';
  price = '';


  constructor() {

  }


  offerOnOff() {
    this.on = !this.on;
    console.log(this.on);
  }


  showTime(time: string) {
    console.log("Time: " , time, "Type of: ", typeof time);
    let hours: number = Number.parseInt(time.substr(0,2));
    let minutes: number = Number.parseInt(time.substr(3,2));
    console.log("hours: ", hours, "minutes: ", minutes, "type of: ", typeof hours, typeof minutes)
    const temptime = Number.parseInt(time);
    console.log("Time as number: ", temptime, "Type of:  ", typeof temptime)
  }
}
