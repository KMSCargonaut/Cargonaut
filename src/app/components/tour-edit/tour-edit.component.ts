import {Component, OnInit} from '@angular/core';
import {Car} from "../../models/Car";
import {ShareDataService} from "../../services/share-data.service";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";
import {CalculateService} from "../../services/calculate.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserCargo} from "../../models/UserCargo";
import {CarsService} from "../../services/cars.service";
import {Tour} from "../../models/Tour";
import {Passenger} from "../../models/Passenger";
import {TourService} from "../../services/tour.service";
import {Status} from "../../models/Status";
import {TourBookComponent} from "../tour-details/tour-book/tour-book.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmDeletionComponent} from "./confirm-deletion/confirm-deletion.component";

@Component({
  selector: 'app-tour-edit',
  templateUrl: './tour-edit.component.html',
  styleUrls: ['./tour-edit.component.css']
})
export class TourEditComponent implements OnInit {

  userCars: Car[] = [];

  isOffer: boolean = true;
  startCity = '';
  endCity = '';
  startTime = '';
  duration = '';
  endTime = '';
  date = '';
  seats = '';
  storage = '';
  price = '';
  description = '';
  chosenCar = '';
  tour: Tour | null = null;
  status: string = '0';

  constructor(public tourData: TourService, public shareData: ShareDataService, public userData: UserService, public alert: AlertService,
              private router: Router, private calcService: CalculateService, public auth: AngularFireAuth, public carData: CarsService, public modalService: NgbModal) {
    this.auth.user.subscribe(async (user) => {
      if (user) {
        const tempCargoUser = await this.userData.getUser(user.uid);
        if(tempCargoUser != undefined) {
          await this.fillCars(tempCargoUser);
        }
      }
    })
  }

  async fillCars(user: UserCargo) {
    if (user) {
      const cars = [];
      for (const carId of user.car) {
        const car = await this.carData.getCarById(carId);
        if (car) {
          cars.push(car)
        }
      }
      this.userCars = [...cars]
    }
  }

  ngOnInit() {
    if(this.shareData.detailTour) {
      this.fillFields()
      this.tour = this.shareData.detailTour
    }

    this.endTime = this.calcService.arrivalTime(this.startTime, this.duration, this.date)
  }

  fillFields() {
    if(this.shareData.detailTour) {
      this.isOffer = this.shareData.detailTour.isOffer
      this.startCity = this.shareData.detailTour.startCity
      this.endCity = this.shareData.detailTour.endCity
      this.startTime = this.shareData.detailTour.startTime
      this.duration = this.shareData.detailTour.duration.toString()
      this.date = this.shareData.detailTour.date
      this.seats = this.shareData.detailTour.seats.toString()
      this.storage = this.shareData.detailTour.storage.toString()
      this.price = this.shareData.detailTour.price.toString()
      this.description = this.shareData.detailTour.description
      this.chosenCar = this.shareData.detailTour.car
      this.status = this.shareData.detailTour.status.toString()
    }
  }

  navigateToProfil() {
    this.router.navigate(['/profil']);
  }

  offerOnOff() {
    this.isOffer = !this.isOffer;
    this.alert.showAlert({type: 'success', message: (this.isOffer)? 'Deine Anfrage wird zu einem Angebot geändert' : 'Dein Angebot wird zu einer Anfrage geändert'});
  }


  calculateEndTime() {
    this.endTime = this.calcService.arrivalTime(this.startTime, this.duration, this.date)
  }

  checkUniqueInputs(): boolean {
    return this.startTime.trim().length > 0 &&
      this.endCity.trim().length > 0 &&
      this.startTime.trim().length > 0 &&
      this.duration.trim().length > 0 &&
      this.date.trim().length > 0 &&
      this.seats.trim().length > 0 &&
      this.storage.trim().length > 0 &&
      Number.parseInt(this.price) > 0 &&
      Number.parseInt(this.seats) > 0 || Number.parseInt(this.storage) > 0;
  }


  async checkInput() {
    const currUser = this.userData.currUser;
    this.newTourParams()
    if (currUser&& this.shareData.detailTour) {
      if (this.isOffer && this.checkUniqueInputs() && this.chosenCar.trim().length > 0) {
        await this.addOffer(this.shareData.detailTour, currUser);
      } else if (this.checkUniqueInputs() && !this.isOffer) {
        await this.addNoOffer(this.shareData.detailTour, currUser);
      } else {
        this.alert.showAlert({type: 'danger', message: 'Alle Felder ausfüllen!'});
      }
    }
  }

  changeStatus(status: string){
    this.status = status;
  }

  async addOffer(tour: Tour, user: UserCargo) {
    tour.driver = user.uid;
    tour.car = this.chosenCar;
    await this.tourUpdate(tour);
  }

  async addNoOffer(tour: Tour, user: UserCargo) {
    tour.passengers[0] = new Passenger(user.uid, Number.parseInt(this.seats), Number.parseInt(this.storage));
    await this.tourUpdate(tour);
  }

  async tourUpdate(tour: Tour) {

    await this.tourData.updateTour(tour);
    this.alert.showAlert({type: 'success', message: 'Tour bearbeitet!'});
  }

  async deleteTour() {
    if (this.shareData.detailTour)
    await this.tourData.deleteTour(this.shareData.detailTour);
    this.router.navigate(["/profil"])
    this.alert.showAlert({type: 'danger', message: 'Tour gelöscht!'});
  }

  openConfirmDeletion() {
    const modalRef = this.modalService.open(ConfirmDeletionComponent, {
      animation: true,
      centered: true,
    });
  }


  newTourParams() {
    if(this.shareData.detailTour) {
      this.shareData.detailTour.isOffer = this.isOffer
      this.shareData.detailTour.startCity = this.startCity
      this.shareData.detailTour.endCity =  this.endCity
      this.shareData.detailTour.startTime = this.startTime
      this.shareData.detailTour.duration = Number.parseInt(this.duration)
      this.shareData.detailTour.date = this.date
      this.shareData.detailTour.seats = Number.parseInt(this.seats)
      this.shareData.detailTour.storage = Number.parseInt(this.storage)
      this.shareData.detailTour.price = Number.parseInt(this.price)
      this.shareData.detailTour.description = this.description
      this.shareData.detailTour.car = this.chosenCar
      this.shareData.detailTour.status = Number.parseInt(this.status)
    }
  }
}
