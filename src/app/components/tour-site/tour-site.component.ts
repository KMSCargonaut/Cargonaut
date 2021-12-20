import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tour-site',
  templateUrl: './tour-site.component.html',
  styleUrls: ['./tour-site.component.css']
})
export class TourSiteComponent{

  searchbarheigth = "5em";
  isOffer: boolean = false;

  constructor() { }

  offerOnOff() {
    this.isOffer = !this.isOffer;
    console.log(this.isOffer);
  }

}
