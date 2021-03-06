import {Component} from '@angular/core';
import {TourService} from "../../services/tour.service";
import {Tour} from "../../models/Tour";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";
import {Car} from "../../models/Car";
import {CarsService} from "../../services/cars.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserCargo} from "../../models/UserCargo";
import {CalculateService} from "../../services/calculate.service";
import {Passenger} from "../../models/Passenger";

@Component({
  selector: 'app-create-tours',
  templateUrl: './create-tours.component.html',
  styleUrls: ['./create-tours.component.css']
})
export class CreateToursComponent {

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


  constructor(public tourData: TourService, public userData: UserService, public alert: AlertService,
              private router: Router, public carData: CarsService, public auth: AngularFireAuth, private calcService: CalculateService) {
    this.auth.user.subscribe(async (user) => {
      if (user) {
        const tempCargoUser = await this.userData.getUser(user.uid);
        if(tempCargoUser != undefined) {
          await this.fillCars(tempCargoUser);
        }
      }
    });
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

  navigateToProfil() {
    this.router.navigate(['/profil']);
  }

  offerOnOff() {
    this.isOffer = !this.isOffer;
  }

  calculateEndTime() {
    this.endTime = this.calcService.arrivalTime(this.startTime, this.duration, this.date)
  }

  checkUniqueInputs(): boolean {
    return this.startCity.trim().length > 0 &&
      this.endCity.trim().length > 0 &&
      this.startTime.trim().length > 0 &&
      this.duration.trim().length > 0 &&
      this.date.trim().length > 0 &&
      this.seats.trim().length > 0 &&
      this.storage.trim().length > 0 &&
      Number.parseInt(this.price) > 0 &&
      (Number.parseInt(this.seats) > 0 || Number.parseInt(this.storage) > 0);
  }


  async checkInput() {
    const currUser = this.userData.currUser;
    let tempTour = this.newTour();
    let startPointDate = new Date(this.date.substr(0, 4) + '/' + this.date.substr(5, 2) + '/' + this.date.substr(8, 2) + ' ' + this.startTime)
    if (currUser) {
      if (this.isOffer && this.checkUniqueInputs() && this.calcService.wasInPast(startPointDate) && this.chosenCar.trim().length > 0) {
        await this.addOffer(tempTour, currUser);
      } else if (this.checkUniqueInputs() && this.calcService.wasInPast(startPointDate) && !this.isOffer) {
        await this.addNoOffer(tempTour, currUser);
      } else if (!this.checkUniqueInputs()) {
        this.alert.showAlert({type: 'danger', message: 'Alle Felder ausf??llen!'});
      } else {
        this.alert.showAlert({type: 'danger', message: 'Der Abfahrtszeitpunkt darf nicht in der Vergangenheit liegen'});
      }
    }
  }

  async addOffer(tour: Tour, user: UserCargo) {
    tour.driver = user.uid;
    tour.car = this.chosenCar;
    await this.addTour(tour);
  }


  async addNoOffer(tour: Tour, user: UserCargo) {
    tour.passengers[0] = new Passenger(user.uid, Number.parseInt(this.seats), Number.parseInt(this.storage));
    await this.addTour(tour);
  }

  async addTour(tour: Tour) {
    await this.tourData.addTour(tour);
    this.clearInputs();
    this.alert.showAlert({type: 'success', message: 'Erfolgreich eine Tour erstellt'});
  }

  newTour() {
    return new Tour(
      (this.userData.currUser) ? this.userData.currUser : new UserCargo('','','','',new Date(), ''),
      this.isOffer,
      this.startCity,
      this.endCity,
      this.startTime,
      Number.parseInt(this.duration),
      this.date,
      Number.parseInt(this.price),
      Number.parseInt(this.storage),
      Number.parseInt(this.seats),
      this.description
    );
  }

  clearInputs() {
    this.startCity = '';
    this.endCity = '';
    this.startTime = '';
    this.duration = '';
    this.date = '';
    this.price = '';
    this.storage = '';
    this.seats = '';
    this.description = '';
    this.chosenCar = '';
    this.endTime = '';
  }

}
