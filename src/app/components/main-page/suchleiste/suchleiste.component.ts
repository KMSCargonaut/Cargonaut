import {Component, Input, OnInit} from '@angular/core';
import {TourService} from "../../../services/tour.service";
import {ShareDataService} from "../../../services/share-data.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-suchleiste',
  templateUrl: './suchleiste.component.html',
  styleUrls: ['./suchleiste.component.css']
})
export class SuchleisteComponent{

  startCity = '';
  endCity = '';
  date = '';
  passengers = '';
  storage = '';

  constructor(public tourData: TourService, public shareData: ShareDataService, public alert: AlertService, private router: Router) { }

  searchbarheigth = "5em";
  iconsize = "25px";

  scroll(el: HTMLElement){
    el.scrollIntoView({behavior: "smooth"});
  }

  async searchButton() {
    console.log(this.tourData.searchTours(/*true,*/ this.startCity, this.endCity, this.date, Number.parseInt(this.storage), Number.parseInt(this.passengers)));
    if (this.checkInput()) {
      this.shareData.tourSearch = await this.tourData.searchTours(/*true,*/ this.startCity, this.endCity, this.date, Number.parseInt(this.storage), Number.parseInt(this.passengers));
      this.router.navigate(["/tours"])
    } else {
      this.alert.showAlert({type: 'danger', message: 'Alle Felder ausfüllen!'});
    }
  }

  checkInput(): boolean {
    return this.startCity.trim().length > 0 &&
      this.endCity.trim().length > 0 &&
      this.date.trim().length > 0 &&
      this.passengers.trim().length > 0 &&
      this.storage.trim().length > 0
  }



}
