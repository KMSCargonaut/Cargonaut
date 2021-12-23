import { Component, OnInit } from '@angular/core';
import {Tour} from "../../models/Tour";
import {TourService} from "../../services/tour.service";

@Component({
  selector: 'app-tour-site',
  templateUrl: './tour-site.component.html',
  styleUrls: ['./tour-site.component.css']
})

//TODO Niklas Thy - Lesbarkeit verbessern
export class TourSiteComponent implements OnInit{

  searchbarheigth = "5em";
  isOffer: boolean = false;
  offerTours: Tour[] = [];
  requestTours: Tour[] = []
  isHorizontal: boolean = false;

  constructor(public tourService: TourService) { }

  offerOnOff() {
    this.isOffer = !this.isOffer;
    console.log(this.isOffer);
  }

  ngOnInit() {
    this.setTours().then();
  }

  async setTours(){
    this.offerTours = await this.tourService.getAllTours().then();
    this.requestTours = this.offerTours.filter(tour => !tour.offer);
    this.offerTours = this.offerTours.filter(tour => tour.offer);
  }
}
