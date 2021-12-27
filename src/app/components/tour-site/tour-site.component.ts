import {Component, OnInit} from '@angular/core';
import {Tour} from "../../models/Tour";
import {TourService} from "../../services/tour.service";
import {elementAt} from "rxjs/operators";

@Component({
  selector: 'app-tour-site',
  templateUrl: './tour-site.component.html',
  styleUrls: ['./tour-site.component.css']
})

//TODO Niklas Thy - Lesbarkeit verbessern
export class TourSiteComponent implements OnInit {

  searchbarheigth = "5em";
  isOffer: boolean = true;
  offerTours: Tour[] = [];
  requestTours: Tour[] = []
  isHorizontal: boolean = false;
  rightTours: Tour[] = []
  leftTours: Tour[] = [];

  constructor(public tourService: TourService) {
  }

  offerOnOff() {
    this.isOffer = !this.isOffer;
    if (this.isOffer) {
      this.splitList(this.offerTours);
    } else {
      this.splitList(this.requestTours);
    }
  }

  ngOnInit() {
    this.setTours().then();
  }

  async setTours() {
    this.offerTours = await this.tourService.getAllTours().then();
    this.requestTours = this.offerTours.filter(tour => !tour.offer);
    this.offerTours = this.offerTours.filter(tour => tour.offer);
  }

  splitList(tours: Tour[]) {
    let right: Tour[] = [];
    let left: Tour [] = [];
    for (let i = 0; i < tours.length; i++) {
      let index: number = i + 1;
      if (index % 2 === 0) {
        right.push(tours[i]);
      } else {
        left.push(tours[i])
      }
    }
    this.rightTours = [...right];
    this.leftTours = [...left];
  }


}
