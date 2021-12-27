import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {TourService} from "../../../services/tour.service";
import {Tour} from "../../../models/Tour";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {AddMoneyComponent} from "../../add-money/add-money.component";

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  currentRate: number = 3.65;
  ownOffers: Tour[] = []
  passengerTours: Tour[] = []
  isHorizontal: boolean = true;

  constructor(public userData: UserService, private router: Router, public tourData: TourService,  private modalService: NgbModal) {
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


  openUpdateModal(): void {
    this.modalService.open(UpdateUserComponent, {
      animation: true,
      centered: true
    });
  }

  openMoneyModal(): void {
    this.modalService.open(AddMoneyComponent, {
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
