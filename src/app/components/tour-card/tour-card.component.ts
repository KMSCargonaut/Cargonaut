import {Component, Input, OnInit} from '@angular/core';
import {Tour} from "../../models/Tour";

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent {

  @Input()
  tours: Tour[] = [];

  constructor() { }

  navigateToDetails() {
console.log(this.tours)
  }

}
