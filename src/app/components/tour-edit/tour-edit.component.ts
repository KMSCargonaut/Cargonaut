import {Component, OnInit} from '@angular/core';
import {Car} from "../../models/Car";
import {ShareDataService} from "../../services/share-data.service";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CalculateService} from "../../services/calculate.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserCargo} from "../../models/UserCargo";
import {CarsService} from "../../services/cars.service";
import {Tour} from "../../models/Tour";
import {Passenger} from "../../models/Passenger";
import {TourService} from "../../services/tour.service";
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
  user: UserCargo | null = null;
  root: string = '';

  constructor(public tourData: TourService, public shareData: ShareDataService, public userData: UserService, public alert: AlertService,
              private router: Router, private calcService: CalculateService, public auth: AngularFireAuth, public carData: CarsService,
              public route: ActivatedRoute, public modalService: NgbModal) {
    this.auth.user.subscribe(async (user) => {
      if (user) {
        const tempCargoUser = await this.userData.getUser(user.uid);
        if (tempCargoUser != undefined) {
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

  async ngOnInit() {
    const did = this.route.snapshot.paramMap.get('did');
    const uid = this.route.snapshot.paramMap.get('uid');
    const root = this.route.snapshot.paramMap.get('root');
    this.root = (root) ? root : '';
    if (did && uid) {
      const tempTour = await this.tourData.getTour(did);
      const tempUser = await this.userData.getUser(uid);
      this.tour = (tempTour) ? tempTour : null;
      this.user = (tempUser) ? tempUser : null;
      this.fillFields();
    }

    this.endTime = this.calcService.arrivalTime(this.startTime, this.duration, this.date)
  }

  fillFields() {
    if (this.tour) {
      this.isOffer = this.tour.isOffer
      this.startCity = this.tour.startCity
      this.endCity = this.tour.endCity
      this.startTime = this.tour.startTime
      this.duration = this.tour.duration.toString()
      this.date = this.tour.date
      this.seats = this.tour.seats.toString()
      this.storage = this.tour.storage.toString()
      this.price = this.tour.price.toString()
      this.description = this.tour.description
      this.chosenCar = this.tour.car
      this.status = this.tour.status.toString()
    }
  }

  navigateToProfil() {
    this.router.navigate(['/profil']);
  }

  offerOnOff() {
    this.isOffer = !this.isOffer;
    this.alert.showAlert({
      type: 'success',
      message: (this.isOffer) ? 'Deine Anfrage wird zu einem Angebot ge??ndert' : 'Dein Angebot wird zu einer Anfrage ge??ndert'
    });
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
    if (currUser && this.tour) {
      if (this.isOffer && this.checkUniqueInputs() && this.chosenCar.trim().length > 0) {
        await this.addOffer(this.tour, currUser);
      } else if (this.checkUniqueInputs() && !this.isOffer) {
        await this.addNoOffer(this.tour, currUser);
      } else {
        this.alert.showAlert({type: 'danger', message: 'Alle Felder ausf??llen!'});
      }
    }
  }

  changeStatus(status: string) {
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
    if (this.tour)
      await this.tourData.deleteTour(this.tour);
    if (this.root === 'profil') {
    this.router.navigate(["/profil"])
    } else {
      const user = this.userData.currUser;
      this.router.navigate([`/genericTable/${user?.uid}`]);
    }
    this.alert.showAlert({type: 'danger', message: 'Tour gel??scht!'});
  }

  openConfirmDeletion() {
    const modalRef = this.modalService.open(ConfirmDeletionComponent, {
      animation: true,
      centered: true,
    });
    modalRef.dismissed.toPromise().then(async (result) => {
      if (this.tour && result) {
        await this.deleteTour()
      }
    })
  }


  newTourParams() {
    if (this.tour) {
      this.tour.isOffer = this.isOffer
      this.tour.startCity = this.startCity
      this.tour.endCity = this.endCity
      this.tour.startTime = this.startTime
      this.tour.duration = Number.parseInt(this.duration)
      this.tour.date = this.date
      this.tour.seats = Number.parseInt(this.seats)
      this.tour.storage = Number.parseInt(this.storage)
      this.tour.price = Number.parseInt(this.price)
      this.tour.description = this.description
      this.tour.car = this.chosenCar
      this.tour.status = Number.parseInt(this.status)
    }
  }
}
