import {Component, Input, OnInit} from '@angular/core';
import {Tour} from "../../models/Tour";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {TourService} from "../../services/tour.service";
import {ShareDataService} from "../../services/share-data.service";

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnInit{

  @Input()
  tour: Tour = new Tour('',false, '','','',0,'',0,0,0,'',);
  mergeDateAndTime = ''
  userName = '';

  constructor(public userService: UserService, private router: Router, public tourService: TourService,
              public shareData: ShareDataService) {
  }

  ngOnInit(){
    this.mergeDateAndTime = this.tour.date + 'T' + this.tour.startTime;
    this.changeUserName()
  }

  async navigateToDetails() {
    this.shareData.detailTour = this.tour;
    const user = await this.userService.getUser(this.tour.creatorID);
    if (user) {
      this.shareData.detailUser = user;
    }
    this.router.navigate(["/tour-details"])
  }

  changeUserName(){
    this.userService.getUser(this.tour.isOffer? this.tour.driver: this.tour.passengers[0]).then(
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
