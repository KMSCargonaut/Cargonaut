import {Component, OnInit} from '@angular/core';
import {Tour} from "../../models/Tour";
import {TourService} from "../../services/tour.service";
import {ShareDataService} from "../../services/share-data.service";
import {Passenger} from "../../models/Passenger";
import {CalculateService} from "../../services/calculate.service";
import {ActivatedRoute} from "@angular/router";

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

  constructor(public tourData: TourService, public tourService: TourService, public shareData: ShareDataService, private calcService: CalculateService, public route: ActivatedRoute) {

  }


  offerOnOff() {
    this.isOffer = !this.isOffer;
    this.fillList().then();
  }

 async ngOnInit() {
   await this.resetSearch()
   if (!this.route.snapshot.paramMap.get('startCity')) {
     this.firstSearch = true;
   }
  }

  async resetSearch() {
    const startCity = this.route.snapshot.paramMap.get('startCity');
    const endCity = this.route.snapshot.paramMap.get('endCity');
    const date = this.route.snapshot.paramMap.get('date');
    const passengers = this.route.snapshot.paramMap.get('passengers');
    const storage = this.route.snapshot.paramMap.get('storage');

    if (startCity && endCity && date && passengers && storage) {
      await this.setTours(startCity, endCity, date, passengers, storage);
      await this.fillList();
    }
    this.isOfferEmpty = this.offerTours.length === 0;
    this.isRequestEmpty = this.requestTours.length === 0;
    this.firstSearch = false;
  }


  async setTours(startCity : string, endCity : string, date : string, passengers : string, storage : string){
      this.offerTours = [];
      this.requestTours = [];
      (await this.tourData.searchTours(startCity, endCity, date, Number.parseInt(storage), Number.parseInt(passengers))).forEach((element) => {
        if ((element.seats - this.calcService.countFreeSeats(element.passengers) >= Number.parseInt(passengers)) &&
          (element.storage - this.calcService.countFreeStorage(element.passengers) >= Number.parseInt(storage) && element.isOffer)) {
          this.offerTours.push(element)
        }
        if (!element.isOffer) {
          this.requestTours.push(element)
        }
      })

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
