import {Component, Input, OnInit} from '@angular/core';
import {Tour} from "../../models/Tour";

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnInit{

  @Input()
  tour: Tour = new Tour(false, '','','',0,'',0,0,0,'',);
  mergeDateAndTime = ''

  constructor() {
  }

  ngOnInit(){
    this.mergeDateAndTime = this.tour.date + 'T' + this.tour.startTime;
    console.log(this.mergeDateAndTime)
  }

  navigateToDetails() {
    console.log(this.tour)
  }


}
