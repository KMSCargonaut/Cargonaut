import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {TourService} from "../../../services/tour.service";
import {Tour} from "../../../models/Tour";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UpdateUserComponent} from "./update-user/update-user.component";

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  currentRate: number = 3;
  ownOffers: Tour[] = []

  constructor(public userData: UserService, private router: Router, public tourData: TourService,  private modalService: NgbModal) {
  }

  ngOnInit() {
    this.setTours().then();
  }

  async setTours(){
    this.ownOffers = await this.tourData.getAllTours().then();
    this.ownOffers = this.ownOffers.filter(tour => tour.driver === this.userData.currUser?.uid)
  }

  async logout(): Promise<void> {
    await this.userData.logout();
  }

  async deleteAccount(): Promise<void> {
    await this.userData.deleteUser();
    await this.userData.deleteAccount();
    if (this.userData.currUser) {
      const userTours = await this.tourData.getAllOpenToursFromUser(this.userData.currUser.uid);
      for (const tour of userTours) {
        await this.tourData.deleteTour(tour);
      }
    }
  }

  openUpdateModal(): void {
    this.modalService.open(UpdateUserComponent, {
      animation: true,
      centered: true
    });
  }

  navigateToCarList() {
    this.router.navigate(['/carList'])
  }

  async test() {
    const user = this.userData.currUser;
    if (user) {
      console.log('Open Tours: ', await this.tourData.getAllOpenToursFromUser(user.uid));
      console.log('Booked Tours: ', await this.tourData.getAllBookedToursFromUser(user.uid))
    }
  }
}
