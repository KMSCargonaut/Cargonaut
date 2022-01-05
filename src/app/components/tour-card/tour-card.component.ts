import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Tour} from "../../models/Tour";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {TourService} from "../../services/tour.service";
import {CalculateService} from "../../services/calculate.service";

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

  constructor(public userService: UserService, private router: Router, public tourService: TourService, private calcService: CalculateService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    let tour = changes.tour.currentValue;
    if (tour.isOffer) {
      this.freeSeats = tour.seats - this.calcService.countFreeSeats((tour.passengers));
      this.freeStorage = tour.storage - this.calcService.countFreeStorage(tour.passengers);
    } else {
      this.freeSeats = tour.seats;
      this.freeStorage = tour.storage;
    }
  }

  ngOnInit(){
    this.mergeDateAndTime = this.tour.date + 'T' + this.tour.startTime;
    this.changeUserName();
  }




  async navigateToDetailsOrEdit() {
    const user = await this.userService.getUser(this.tour.creatorID);

    if (this.userService.currUser) {
      if (this.userService.currUser.uid === this.tour.creatorID){
        this.router.navigate([`/editTour/${this.tour.dID}/${user?.uid}`])
      } else {
        this.router.navigate([`/tour-details/${this.tour.dID}/${user?.uid}`])
      }
    } else {
      this.router.navigate([`/tour-details/${this.tour.dID}/${user?.uid}`])
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
