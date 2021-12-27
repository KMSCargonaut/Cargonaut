import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {TourService} from "../../../services/tour.service";
import {Tour} from "../../../models/Tour";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {AlertService} from "../../../services/alert.service";
import {AddMoneyComponent} from "../../add-money/add-money.component";
import {CarsService} from "../../../services/cars.service";

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
    public alertData: AlertService, public carData: CarsService) {
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
    let userTours: Tour[];
    const user = this.userData.currUser;
    if (user) {
      let futureTours = await this.tourData.getAllBookedTours();
      futureTours = futureTours
        .filter(tour => this.bookedToursInFuture(new Date(tour.date)))
        .filter(tour => tour.driver === user.uid || this.isPassenger(tour, user.uid));
      console.log('Future Tours: ', futureTours);
      if (futureTours.length <= 0) {
        try {
          await this.userData.deleteAccount();
          await this.userData.deleteUser(user);
          userTours = await this.tourData.getAllToursFromUser(user.uid);
          userTours = userTours.filter(tour => !tour.isBooked);
          console.log('user tours: ', userTours)
          for (const tour of userTours) {
            await this.tourData.deleteTour(tour);
          }
          for (const carID of user.car) {
            await this.carData.deleteCar(carID);
          }
          this.alertData.showAlert({type: 'success', message: 'Du hast erfolgreich deinen Account gelöscht!'})
        } catch (e) {
          if (e.code === 'auth/requires-recent-login') {
            this.alertData.showAlert({
              type: 'danger',
              message: 'Sie müssen sich erneut anmelden, um diese Aktion durchzuführen'
            })
            await this.logout()
          } else {
            this.alertData.showAlert({type: 'danger', message: 'Etwas ist schief gelaufen'})
            console.log(e);
          }
        }
      } else {
        this.alertData.showAlert({type: 'danger', message: 'Du hast noch offene gebuchte Fahrten!'})
      }


    }
  }

  bookedToursInFuture(date: Date): boolean {
    const tempBol = (new Date().getTime() - date.getTime()) < 0;
    console.log(tempBol)
    return tempBol;
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

  isPassenger(tour: Tour, uID: string | undefined) {
    if (uID) {
      return tour.passengers.includes(uID);
    }
    return false;
  }

  // Test
  /*onWheel(event: WheelEvent) {
    console.log(event.deltaY)
    if(event.deltaY > 0) {
      // @ts-ignore
      (<Element>event.target).parentElement.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  }*/
}
