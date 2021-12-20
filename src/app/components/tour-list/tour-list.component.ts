import {Component, Input, OnInit} from '@angular/core';
import {TourService} from "../../services/tour.service";
import {Tour} from "../../models/Tour";

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent{

  tours: Tour[] = []
  @Input() isOffer: boolean = false;

  constructor(public tourService: TourService) {
    this.setTours().then();
  }

  async setTours(){
    this.tours = await this.tourService.getAllTours().then();
    console.log(this.tours);
  }

}
