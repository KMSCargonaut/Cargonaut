import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Tour} from "../../models/Tour";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {TourService} from "../../services/tour.service";
import {ShareDataService} from "../../services/share-data.service";
import {Passenger} from "../../models/Passenger";

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnInit, OnChanges{

  @Input() tour: Tour = new Tour('',false, '','','',0,'',0,0,0,'',);
  mergeDateAndTime = ''
  userName = '';
  freeSeats = 0;
  freeStorage = 0;

  constructor(public userService: UserService, private router: Router, public tourService: TourService,
              public shareData: ShareDataService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    let tour = changes.tour.currentValue;
    this.freeSeats = tour.seats - this.countFreeSeats(tour.passengers);
    this.freeStorage = tour.storage - this.countFreeStorage(tour.passengers);
  }

  ngOnInit(){
    this.mergeDateAndTime = this.tour.date + 'T' + this.tour.startTime;
    this.changeUserName();
  }

  countFreeStorage(passengers: Passenger[]): number {
    let storage = 0;
    for (const passenger of passengers) {
      storage += passenger.storage;
    }
    return storage;
  }

  countFreeSeats(passengers: Passenger[]): number {
    let seats = 0;
    for (const passenger of passengers) {
      seats += passenger.seats;
    }
    return seats;
  }

  async navigateToDetailsOrEdit() {
    this.shareData.detailTour = this.tour;
    const user = await this.userService.getUser(this.tour.creatorID);
    if (user) {
      this.shareData.detailUser = user;
    }

    if (this.userService.currUser) {
      if (this.userService.currUser.uid === this.tour.creatorID){
        this.router.navigate(["/editTour"])
      } else {
        this.router.navigate(["/tour-details"])
      }
    } else {
      this.router.navigate(["/tour-details"])
    }

  }

  changeUserName(){
    this.userService.getUser(this.tour.creatorID).then(
      (user) => {
        if (user) {
          this.userName = user.username
        }else{
          this.userName = "Kein User"
        }
      }
    )
  }

}
