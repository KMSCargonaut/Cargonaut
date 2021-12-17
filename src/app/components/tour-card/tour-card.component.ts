import {Component, Input, OnInit} from '@angular/core';
import {Tour} from "../../models/Tour";

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent {

  @Input()
  tour: Tour = new Tour(false, '','','19:20',0,'2021-12-07',0,0,0,'',);
  mergeDateAndTime = ''

  constructor() {
    this.mergeDateAndTime = this.tour.date + 'T' + this.tour.startTime;
  }

  navigateToDetails() {
    console.log(this.tour)
  }


}
