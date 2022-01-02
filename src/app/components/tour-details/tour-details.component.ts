import {Component, OnInit} from '@angular/core';
import {CalculateService} from "../../services/calculate.service";
import {UserService} from "../../services/user.service";
import {ShareDataService} from "../../services/share-data.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TourBookComponent} from "./tour-book/tour-book.component";
import {Tour} from "../../models/Tour";
import {TourService} from "../../services/tour.service";
import {AlertService} from "../../services/alert.service";
import {CarsService} from "../../services/cars.service";
import {Car} from "../../models/Car";
import {Passenger} from "../../models/Passenger";

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {

  mergeDateAndTime = ''
  endTime = '';
  userName = '';
  car: Car | null = null;
  passengers: Passenger[] = [];
  passengersName: string[] = [];
  driver: string = '';
  freeSeats: number = 0;
  freeStorage: number = 0;


  constructor(public shareData: ShareDataService, private calcService: CalculateService, public userService: UserService,
              public router: Router, public modalService: NgbModal, public tourData: TourService, public alertData: AlertService,
              public carData: CarsService) {
    console.log(this.shareData.detailTour?.date)
  }


  async ngOnInit() {
    console.log('ngOnInit tour-details: ', this.shareData.detailTour);
    this.mergeDateAndTime = this.shareData.detailTour?.date + 'T' + this.shareData.detailTour?.startTime;
    if (this.shareData.detailTour) {
      this.car = await this.carData.getCarById(this.shareData.detailTour.car);
      this.passengers = this.shareData.detailTour.passengers;
      const currDriverId = this.shareData.detailTour.driver;
      const driver = (currDriverId.trim().length > 0) ? await this.userService.getUser(currDriverId) : null;
      this.freeStorage = this.shareData.detailTour.storage;
      this.freeSeats = this.shareData.detailTour.seats;
      if (driver) {
        this.driver = driver.username;
      }
      if (this.passengers.length !== 0) {
        await this.fillPassengersName()
        this.freeSeats = this.freeSeats - this.countFreeSeats(this.passengers);
        this.freeStorage = this.freeStorage - this.countFreeStorage(this.passengers);
      }
    }
    this.calculateEndTime()
    this.changeUserName()
  }

  countFreeStorage(passengers: Passenger[]): number {
    let storage = 0;
    for (const passenger of passengers) {
      storage += passenger.storage;
    }
    return storage;
  }

  countFreeSeats(passengers: Passenger[]): number {
    let seats = 0;
    for (const passenger of passengers) {
      seats += passenger.seats;
    }
    return seats;
  }

  async fillPassengersName() {
    let currArr = [];
    for (let passenger of this.passengers) {
      const user = await this.userService.getUser(passenger.id);
      const name = (user) ? user.username : '';
      currArr.push(name);
    }
    this.passengersName = [...currArr];
  }


  calculateEndTime() {
    if (this.shareData.detailTour?.startTime && this.shareData.detailTour?.duration && this.shareData.detailTour?.date) {
      this.endTime = this.calcService.arrivalTime(this.shareData.detailTour?.startTime, this.shareData.detailTour?.duration.toString(), this.shareData.detailTour?.date)
    }

  }

  changeUserName() {
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

  bookedUp(): boolean {
    let tour = this.shareData.detailTour;
    if (tour) {
      return tour.isStorageFullyLoaded && tour.areSeatsOccupied;
    } else {
      return true;
    }
  }

  alreadyPassenger(): boolean {
    let tour = this.shareData.detailTour;
    let user = this.userService.currUser;
    let alreadyPass = false;
    if (tour && user) {
      for (let passenger of tour.passengers) {
        if (passenger.id === user.uid) {
          alreadyPass = true;
        }
      }
    }
    return alreadyPass;
  }

  alreadyDriver(): boolean {
    let tour = this.shareData.detailTour;
    let user = this.userService.currUser;
    if (tour && user) {
      return tour.driver === user.uid;
    }
    return false;
  }

  cancelTour() {
    let tour = this.shareData.detailTour;
    if (tour) {
      if (tour.isOffer) {
        this.cancelIfOffer(tour);
      } else {
        this.cancelIfNoOffer(tour)
      }
    }
  }

  async cancelIfOffer(tour: Tour) {
    let uid = (this.userService.currUser) ? this.userService.currUser.uid : '';
    for (let i = 0; i < tour.passengers.length; i++) {
      if (tour.passengers[i].id === uid) {
        tour.passengers.splice(i, 1);
        this.passengers.splice(i, 1);
        break;
      }
    }

    if (tour.passengers.length === 0) {
      tour.isBooked = false;
      tour.isStorageFullyLoaded = false;
      tour.areSeatsOccupied = false;
    } else {
      let seats: number = 0;
      for (const passenger of tour.passengers) {
        seats += passenger.seats
      }
      if (seats < tour.seats) {
        tour.areSeatsOccupied = false;
      }

      let storage: number = 0;
      for (const passenger of tour.passengers) {
        storage += passenger.storage
      }

      if (storage < tour.storage) {
        tour.isStorageFullyLoaded = false;
      }
    }

    await this.tourData.updateTour(tour);
    console.log('canceled offer tour')
    this.alertData.showAlert({type: 'success', message: 'Erfolgreich storniert'})
  }

  async cancelIfNoOffer(tour: Tour) {
    this.driver = '';
    tour.car = '';
    tour.driver = '';
    tour.isBooked = false;
    tour.areSeatsOccupied = false;
    tour.isStorageFullyLoaded = false;
    await this.tourData.updateTour(tour);
    console.log('canceled no offer tour')
    this.alertData.showAlert({type: 'success', message: 'Erfolgreich storniert'})

  }

  openTourBook() {
    const modalRef = this.modalService.open(TourBookComponent, {
      animation: true,
      centered: true,
    });
    modalRef.dismissed.toPromise().then(async (tour) => {
      // window.location.reload();
      console.log('onDissmiss', tour);
      if (tour) {
        this.passengers = [...tour.passengers];
        await this.fillPassengersName();

        if (tour.driver.trim().length > 0) {
          const currDriver = await this.userService.getUser(tour.driver);
          this.driver = (currDriver) ? currDriver.username : '';
          this.car = await this.carData.getCarById(tour.car);
        }
      }

    })
    modalRef.componentInstance.passedData = this.shareData.detailTour;
  }

  navigateToUser() {
    this.router.navigate(['/exprofile']);
  }

}
