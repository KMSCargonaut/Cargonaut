import {Component, OnInit} from '@angular/core';
import {TourService} from "../../../services/tour.service";
import {ShareDataService} from "../../../services/share-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-suchleiste',
  templateUrl: './suchleiste.component.html',
  styleUrls: ['./suchleiste.component.css']
})
export class SuchleisteComponent implements OnInit {

  startCity = '';
  endCity = '';
  date = '';
  passengers = '0';
  storage = '0';
  @Output() newSearchEvent = new EventEmitter<null>();

  addNewSearch() {
    this.newSearchEvent.emit();
    }

  constructor(public tourData: TourService, public shareData: ShareDataService, public alert: AlertService, private router: Router, public route: ActivatedRoute) { }

  searchbarheigth = "5em";
  iconsize = "25px";

  scroll(el: HTMLElement){
    el.scrollIntoView({behavior: "smooth"});
  }

  async searchButton() {
    if (this.checkInput()) {
      await this.router.navigate([`/tours/${this.startCity}/${this.endCity}/${this.date}/${this.passengers}/${this.storage}`])
      await this.addNewSearch()
      } else {
      this.alert.showAlert({type: 'danger', message: 'Alle Felder müssen ausgefüllt sein'});
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

  ngOnInit() {
    const startCity = this.route.snapshot.paramMap.get('startCity');
    const endCity = this.route.snapshot.paramMap.get('endCity');
    const date = this.route.snapshot.paramMap.get('date');
    const passengers = this.route.snapshot.paramMap.get('passengers');
    const storage = this.route.snapshot.paramMap.get('storage');
    if (startCity && endCity && date && passengers && storage) {
      this.startCity = startCity;
      this.endCity = endCity;
      this.date = date;
      this.passengers = passengers;
      this.storage = storage;
    }
  }



}
