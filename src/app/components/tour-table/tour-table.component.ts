import {Component, Input} from '@angular/core';
import {Tour} from "../../models/Tour";
import {TourService} from "../../services/tour.service";
import {ShareDataService} from "../../services/share-data.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tour-table',
  templateUrl: './tour-table.component.html',
  styleUrls: ['./tour-table.component.css']
})
export class TourTableComponent {

  @Input() usedList: Tour[] = [];

  constructor(public tourService: TourService, public shareData: ShareDataService, public userService: UserService,
              public router: Router) {

  }

  async navigateToDetailsOrEdit(tour: Tour) {
    this.shareData.detailTour = tour;
    const user = await this.userService.getUser(tour.creatorID);
    if (user) {
      this.shareData.detailUser = user;
    }

    if (this.userService.currUser) {
      if (this.userService.currUser.uid === tour.creatorID) {
        this.router.navigate(["/editTour"])
      } else {
        this.router.navigate(["/tour-details"])
      }
    } else {
      this.router.navigate(["/tour-details"])
    }
  }
}
