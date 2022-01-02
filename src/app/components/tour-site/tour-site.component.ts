import {Component, OnInit} from '@angular/core';
import {Tour} from "../../models/Tour";
import {TourService} from "../../services/tour.service";
import {ShareDataService} from "../../services/share-data.service";

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
  isOfferEmpty = false;
  isRequestEmpty = false;
  firstSearch = false; //Diese Variable dient dazu abzubilden ob von der Startseite über "Mitfahrgelegenheiten" in der Navbar zu dieser Seite navigiert wurde.

  constructor(public tourService: TourService, public shareData: ShareDataService) {

  }


  offerOnOff() {
    this.isOffer = !this.isOffer;
    this.fillList().then();
  }

 async ngOnInit() {
    await this.resetSearch();
    if (!this.shareData.tourSearch) {
      this.firstSearch = true;
    }
  }

  async resetSearch() {
    await this.setTours();
    await this.fillList();
    this.isOfferEmpty = this.offerTours.length === 0;
    this.isRequestEmpty = this.requestTours.length === 0;
    this.firstSearch = false;
  }


  async setTours(){
    if (this.shareData.tourSearch !== null) {
      this.offerTours = this.shareData.tourSearch.filter(tour => tour.isOffer);
      console.log(this.offerTours)
      this.requestTours = this.shareData.tourSearch.filter(tour => !tour.isOffer);
    }
  }

  async fillList() {
    if (this.isOffer) {
      this.splitList(this.offerTours);
    } else {
      this.splitList(this.requestTours);
    }
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
