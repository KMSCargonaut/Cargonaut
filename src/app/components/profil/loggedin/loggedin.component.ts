import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {TourService} from "../../../services/tour.service";
import {Tour} from "../../../models/Tour";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  currentRate: number = 3;
  ownOffers: Tour[] = []
  passengerTours: Tour[] = []
  isHorizontal: boolean = true;

  constructor(
    public userData: UserService, private router: Router, public tourData: TourService, private modalService: NgbModal,
    public alertData: AlertService) {
  }

  ngOnInit() {
    this.setTours().then();
  }

  async setTours(){
    this.ownOffers = await this.tourData.getAllTours().then();
    this.passengerTours = this.ownOffers.filter(tour => this.isPassenger(tour, this.userData.currUser?.uid))
    this.ownOffers = this.ownOffers.filter(tour => tour.driver === this.userData.currUser?.uid)
  }

  async logout(): Promise<void> {
    await this.userData.logout();
  }

  async deleteAccount(): Promise<void> {
    let userTours;
    const user = this.userData.currUser;
    if (user) {
      const futureTours = await this.tourData.getAllBookedTours();
      futureTours
        .filter(tour => this.bookedToursInFuture(new Date(tour.date)))
        .filter(tour => tour.driver === user.uid || this.isPassenger(tour, user.uid));
      console.log(futureTours);
      if (futureTours.length <= 0) {
        await this.userData.deleteUser();
        await this.userData.deleteAccount();
        userTours = await this.tourData.getAllToursFromUser(user.uid);
        userTours.filter(tour => !tour.isBooked)
        for (const tour of userTours) {
          await this.tourData.deleteTour(tour);
        }
      } else {
        this.alertData.showAlert({type: 'danger', message: 'Du hast noch offene gebuchte Fahrten!'})
      }




    }
  }

  bookedToursInFuture(date: Date): boolean {
    return (new Date().getTime() - date.getTime()) < 0;
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

  isPassenger(tour:Tour, uID: string | undefined) {
    if (uID) {
      return tour.passengers.includes(uID);
    }
    return false;
  }
}
