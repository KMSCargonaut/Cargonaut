import {Component, Input, OnInit} from '@angular/core';
import {Tour} from "../../models/Tour";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UserCargo} from "../../models/UserCargo";
import {TourService} from "../../services/tour.service";

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

  constructor(public userService: UserService, private router: Router, public tourService: TourService) {
  }

  ngOnInit(){
    this.mergeDateAndTime = this.tour.date + 'T' + this.tour.startTime;
    this.changeUserName()
  }

  navigateToDetails() {
    this.tourService.tourDetails = this.tour
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
