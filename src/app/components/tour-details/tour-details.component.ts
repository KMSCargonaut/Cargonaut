import {Component, OnInit} from '@angular/core';
import {CalculateService} from "../../services/calculate.service";
import {UserService} from "../../services/user.service";
import {ShareDataService} from "../../services/share-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TourBookComponent} from "./tour-book/tour-book.component";
import {Tour} from "../../models/Tour";
import {TourService} from "../../services/tour.service";
import {AlertService} from "../../services/alert.service";
import {CarsService} from "../../services/cars.service";
import {Car} from "../../models/Car";
import {Passenger} from "../../models/Passenger";
import {UserCargo} from "../../models/UserCargo";

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
  afterModal: boolean = false;
  ultimateTour: Tour | null = null;
  ultimateUser: UserCargo | null = null;


  constructor(public shareData: ShareDataService, private calcService: CalculateService, public userService: UserService,
              public router: Router, public modalService: NgbModal, public tourData: TourService, public alertData: AlertService,
              public carData: CarsService, public route: ActivatedRoute) {
  }


  async ngOnInit() {
    const did = this.route.snapshot.paramMap.get('did');
    const uid = this.route.snapshot.paramMap.get('uid');
    if (did && uid) {
      const tempTour = await this.tourData.getTour(did);
      const tempUser = await this.userService.getUser(uid);
      this.ultimateTour = (tempTour) ? tempTour : null;
      this.ultimateUser = (tempUser) ? tempUser : null;
      console.log('TOUR IN TOUR DETAILS: ', this.ultimateTour, tempUser);
    }
    this.mergeDateAndTime = this.ultimateTour?.date + 'T' + this.ultimateTour?.startTime;
    if (this.ultimateTour) {
      const carId = this.ultimateTour.car;
      if (carId.trim().length > 0) {
        this.car = await this.carData.getCarById(carId);
      }
      this.passengers = this.ultimateTour.passengers;
      this.freeStorage = this.ultimateTour.storage;
      this.freeSeats = this.ultimateTour.seats;
      const currDriverId = this.ultimateTour.driver;
      const driver = (currDriverId.trim().length > 0) ? await this.userService.getUser(currDriverId) : null;
      if (driver) {
        this.driver = driver.username;
      }
      if (this.passengers.length !== 0) {
        await this.fillPassengersName()
        if (this.ultimateTour.isOffer) {
          this.freeSeats = this.freeSeats - this.countFreeSeats(this.passengers);
          this.freeStorage = this.freeStorage - this.countFreeStorage(this.passengers);
        }

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
    if (this.ultimateTour?.startTime && this.ultimateTour?.duration && this.ultimateTour?.date) {
      this.endTime = this.calcService.arrivalTime(this.ultimateTour?.startTime, this.ultimateTour?.duration.toString(), this.ultimateTour?.date)
    }

  }

  changeUserName() {
    if (this.ultimateTour?.passengers[0] || this.ultimateTour?.driver && this.ultimateTour?.isOffer) {
      this.userService.getUser(this.ultimateTour?.creatorID).then(
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
    let tour = this.ultimateTour;
    if (tour) {
      return tour.isStorageFullyLoaded && tour.areSeatsOccupied;
    } else {
      return true;
    }
  }

  alreadyPassenger(): boolean {
    let tour = this.ultimateTour;
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
    let tour = this.ultimateTour;
    let user = this.userService.currUser;
    if (tour && user) {
      return tour.driver === user.uid;
    }
    return false;
  }

  isCreator(): boolean {
    const tour = this.ultimateTour;
    const user = this.userService.currUser;
    if (tour && user) {
      return tour.creatorID === user.uid;
    }
    return false;
  }

  navigateToEdit() {
    const root = this.route.snapshot.url[0].path;
    this.router.navigate([`editTour/${this.ultimateTour?.dID}/${this.userService.currUser?.uid}/${root}`])
  }

  cancelTour() {
    let tour = this.ultimateTour;
    if (tour) {
      if (tour.isOffer) {
        this.cancelIfOffer(tour);
      } else {
        this.cancelIfNoOffer(tour)
      }
    }
  }

  async cancelIfOffer(tour: Tour) {
    this.afterModal = false;
    let uid = (this.userService.currUser) ? this.userService.currUser.uid : '';
    for (let i = 0; i < tour.passengers.length; i++) {
      if (tour.passengers[i].id === uid) {
        tour.passengers.splice(i, 1);
        this.passengers.splice(i, 1);
        break;
      }
    }

    if (tour.passengers.length !== 0) {
      await this.fillPassengersName()
      this.freeSeats = this.freeSeats - this.countFreeSeats(this.passengers);
      this.freeStorage = this.freeStorage - this.countFreeStorage(this.passengers);
    } else {
      this.freeSeats = tour.seats;
      this.freeStorage = tour.storage;
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
    this.afterModal = false;
    this.alertData.showAlert({type: 'success', message: 'Erfolgreich storniert'})
  }

  openTourBook() {
    const modalRef = this.modalService.open(TourBookComponent, {
      animation: true,
      centered: true,
    });
    modalRef.dismissed.toPromise().then(async (arr) => {
      const tour = arr[0];
      this.afterModal = arr[1];
      console.log(this.afterModal);
      if (tour) {
        this.passengers = [...tour.passengers];
        await this.fillPassengersName();

        if (tour.isOffer) {
          if (tour.passengers.length !== 0) {
            await this.fillPassengersName()
            this.freeSeats = this.freeSeats - this.countFreeSeats(this.passengers);
            this.freeStorage = this.freeStorage - this.countFreeStorage(this.passengers);
          } else {
            this.freeSeats = tour.seats;
            this.freeStorage = tour.storage;
          }
        }

        if (tour.driver.trim().length > 0) {
          const currDriver = await this.userService.getUser(tour.driver);
          this.driver = (currDriver) ? currDriver.username : '';
          this.car = await this.carData.getCarById(tour.car);
        }

      }
    })
    modalRef.componentInstance.passedData = this.ultimateTour;
  }

  navigateToUser() {
    if (this.userService.currUser) {
      if (this.ultimateTour?.creatorID === this.userService.currUser.uid) {
        this.router.navigate([`/profil`])
      } else {
        this.router.navigate([`/exprofile//${this.ultimateUser?.uid}`]);
      }
    } else {
      this.router.navigate([`/exprofile//${this.ultimateUser?.uid}`]);
    }
  }

  navigateToProfile() {
    this.router.navigate([`/profil`])

  }

}
