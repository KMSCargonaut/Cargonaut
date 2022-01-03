import {Component} from '@angular/core';
import {TourService} from "../../../services/tour.service";
import {ShareDataService} from "../../../services/share-data.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-suchleiste',
  templateUrl: './suchleiste.component.html',
  styleUrls: ['./suchleiste.component.css']
})
export class SuchleisteComponent{

  startCity = '';
  endCity = '';
  date = '';
  passengers = '0';
  storage = '0';
  @Output() newSearchEvent = new EventEmitter<null>();

  addNewSearch() {
    this.newSearchEvent.emit();
  }

  constructor(public tourData: TourService, public shareData: ShareDataService, public alert: AlertService, private router: Router) { }

  searchbarheigth = "5em";
  iconsize = "25px";

  scroll(el: HTMLElement){
    el.scrollIntoView({behavior: "smooth"});
  }

  async searchButton() {
    console.log(this.tourData.searchTours(this.startCity, this.endCity, this.date, Number.parseInt(this.storage), Number.parseInt(this.passengers)));
    if (this.checkInput()) {
      this.shareData.tourSearch = await this.tourData.searchTours(/*true,*/ this.startCity, this.endCity, this.date, Number.parseInt(this.storage), Number.parseInt(this.passengers));
      this.shareData.searchSeats = Number.parseInt(this.passengers);
      this.shareData.searchStorage = Number.parseInt(this.storage);
      if (this.router.url === '/tours') {
        /*this.redirectTo('/tours')*/
        //Event von Child zu Parent pushen
        this.addNewSearch()
      }
      this.router.navigate(["/tours"])
    } else {
      this.alert.showAlert({type: 'danger', message: 'Alle Felder ausfüllen!'});
    }
  }

  //Helper method
  redirectTo(uri:string){
    this.router.navigateByUrl('/tours', {skipLocationChange: false}).then(()=>
      this.router.navigate([uri]));
  }

  checkInput(): boolean {
    return this.startCity.trim().length > 0 &&
      this.endCity.trim().length > 0 &&
      this.date.trim().length > 0 &&
      this.passengers.trim().length > 0 &&
      this.storage.trim().length > 0
  }



}
