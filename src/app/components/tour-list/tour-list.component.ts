import {Component, Input, OnInit} from '@angular/core';
import {TourService} from "../../services/tour.service";
import {Tour} from "../../models/Tour";
import {ShareDataService} from "../../services/share-data.service";

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {

  @Input() usedList: Tour[] | null = [];
  @Input() isHorizontal: boolean = false;

  constructor(public tourService: TourService, public shareData: ShareDataService) {

  }

  ngOnInit() {
    this.usedList = this.shareData.tourSearch;
  }



}
