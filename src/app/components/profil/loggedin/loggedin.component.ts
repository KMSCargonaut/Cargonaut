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
import {EditAccountComponent} from "../../edit-account/edit-account.component";
import {CalculateService} from "../../../services/calculate.service";
import {ConfirmDeleteAccountComponent} from "./confirm-delete-account/confirm-delete-account.component";

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  ownOffers: Tour[] = []
  passengerTours: Tour[] = []

  constructor(
    public userData: UserService, private router: Router, public tourData: TourService, private modalService: NgbModal,
    public alertData: AlertService, public carData: CarsService, private calcService: CalculateService, public modal: NgbModal) {
  }

  ngOnInit() {
    this.setTours().then();
  }

  async setTours() {
    this.ownOffers = await this.tourData.getAllTours().then();
    this.passengerTours = this.ownOffers
      .filter(tour => this.isPassenger(tour, this.userData.currUser?.uid))
      .filter(tour => !this.wasTourInPast(tour.date, tour.startTime))
      .filter(tour => tour.isBooked);
    this.ownOffers = this.ownOffers
      .filter(tour => tour.driver === this.userData.currUser?.uid)
      .filter(tour => !this.wasTourInPast(tour.date, tour.startTime))
      .filter(tour => tour.isBooked);
  }

  async logout(): Promise<void> {
    await this.userData.logout();
  }

  async openDeleteModal() {
    const modalRef = this.modal.open(ConfirmDeleteAccountComponent, {
      animation: true,
      centered: true,
    })

    modalRef.dismissed.toPromise().then(async (result) => {
      if (result) {
        await this.deleteAccount();
      }
    })
  }

  async deleteAccount(): Promise<void> {
    let userTours: Tour[];
    const user = this.userData.currUser;
    if (user) {
      let futureTours = await this.tourData.getAllBookedTours();
      futureTours = futureTours
        .filter(tour => this.wasTourInPast(tour.date, tour.startTime))
        .filter(tour => tour.driver === user.uid || this.isPassenger(tour, user.uid));
      if (futureTours.length <= 0) {
        try {
          await this.userData.deleteAccount();
          await this.userData.deleteUser(user);
          userTours = await this.tourData.getAllToursFromUser(user.uid);
          userTours = userTours.filter(tour => !tour.isBooked);
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
          }
        }
      } else {
        this.alertData.showAlert({type: 'danger', message: 'Du hast noch offene gebuchte Fahrten!'})
      }


    }
  }

  wasTourInPast(date: string, time: string): boolean {
    const newDate = new Date().getTime();
    const oldDate = new Date(this.calcService.arrivalTime(time, '0', date));
    return (newDate - oldDate.getTime()) > 0;
  }



  openUpdateModal(): void {
    this.modalService.open(UpdateUserComponent, {
      animation: true,
      centered: true
    });
  }

  openAccountModal(): void {
    this.modalService.open(EditAccountComponent, {
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
      return tour.passengers.filter(passenger => passenger.id === uID).length > 0;
    }
    return false;
  }
}
