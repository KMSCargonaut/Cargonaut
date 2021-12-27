import {Component, Input, OnInit} from '@angular/core';
import {TourService} from "../../services/tour.service";
import {CalculateService} from "../../services/calculate.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit{

  mergeDateAndTime = ''
  iconSize = "2em"
  endTime = '';
  userName = 'Max Mustermann';

  constructor(public tourService: TourService, private calcService: CalculateService, public userService: UserService) {
    console.log(this.tourService.tourDetails?.date)
  }




  ngOnInit() {
    this.mergeDateAndTime = this.tourService.tourDetails?.date + 'T' + this.tourService.tourDetails?.startTime;
    this.calculateEndTime()
    this.changeUserName()
  }

  calculateEndTime() {
    if (this.tourService.tourDetails?.startTime && this.tourService.tourDetails?.duration && this.tourService.tourDetails?.date) {
      this.endTime = this.calcService.arrivalTime(this.tourService.tourDetails?.startTime, this.tourService.tourDetails?.duration.toString(), this.tourService.tourDetails?.date)
    }

  }

  changeUserName(){
    if (this.tourService.tourDetails?.passengers[0] || this.tourService.tourDetails?.driver && this.tourService.tourDetails?.isOffer) {
      this.userService.getUser(this.tourService.tourDetails?.isOffer ? this.tourService.tourDetails.driver : this.tourService.tourDetails?.passengers[0]).then(
        (user) => {
          if (user) {
            this.userName = user.username
          } else {
            this.userName = "Kein User"
          }
        }
      )
    }
  }


}
