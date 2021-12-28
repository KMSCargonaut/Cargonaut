import {Component, OnInit} from '@angular/core';
import {CalculateService} from "../../services/calculate.service";
import {UserService} from "../../services/user.service";
import {ShareDataService} from "../../services/share-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit{

  mergeDateAndTime = ''
  iconSize = "2em"
  endTime = '';
  userName = '';

  constructor(public shareData: ShareDataService, private calcService: CalculateService, public userService: UserService,
              public router: Router) {
    console.log(this.shareData.detailTour?.date)
  }


  ngOnInit() {
    this.mergeDateAndTime = this.shareData.detailTour?.date + 'T' + this.shareData.detailTour?.startTime;
    this.calculateEndTime()
    this.changeUserName()
  }

  calculateEndTime() {
    if (this.shareData.detailTour?.startTime && this.shareData.detailTour?.duration && this.shareData.detailTour?.date) {
      this.endTime = this.calcService.arrivalTime(this.shareData.detailTour?.startTime, this.shareData.detailTour?.duration.toString(), this.shareData.detailTour?.date)
    }

  }

  changeUserName(){
    if (this.shareData.detailTour?.passengers[0] || this.shareData.detailTour?.driver && this.shareData.detailTour?.isOffer) {
      this.userService.getUser(this.shareData.detailTour?.creatorID).then(
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

  navigateToUser() {
    this.router.navigate(['/exprofile']);
  }

}
