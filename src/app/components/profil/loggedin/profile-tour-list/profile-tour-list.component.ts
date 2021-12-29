import {Component, Input, OnInit} from '@angular/core';
import {Tour} from "../../../../models/Tour";
import {TourService} from "../../../../services/tour.service";

@Component({
  selector: 'app-profile-tour-list',
  templateUrl: './profile-tour-list.component.html',
  styleUrls: ['./profile-tour-list.component.css']
})
export class ProfileTourListComponent{

  @Input() usedList: Tour[] = [];

  constructor(public tourService: TourService) {

  }


}
