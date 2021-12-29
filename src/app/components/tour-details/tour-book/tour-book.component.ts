import {Component, Input, OnInit} from '@angular/core';
import {Tour} from "../../../models/Tour";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../../services/alert.service";
import {Passenger} from "../../../models/Passenger";
import {UserService} from "../../../services/user.service";
import {TourService} from "../../../services/tour.service";
import {Car} from "../../../models/Car";
import {CarsService} from "../../../services/cars.service";
import {ShareDataService} from "../../../services/share-data.service";

@Component({
  selector: 'app-tour-book',
  templateUrl: './tour-book.component.html',
  styleUrls: ['./tour-book.component.css']
})
export class TourBookComponent implements OnInit {

  @Input() public passedData: any;
  tour: Tour | null = null;
  seats: number[] = [];
  storage: number[] = [];
  cars: Car[] = [];
  tempCar = ''

  constructor(public activeModal: NgbActiveModal, public alertData: AlertService, public userData: UserService,
              public tourData: TourService, public carData: CarsService, public shareData: ShareDataService) {
  }

  ngOnInit(): void {
    this.tour = {...this.passedData};
    this.fillSeats();
    this.fillStorage();
    if (this.userData.currUser) {
    let cars = [...this.userData.currUser.car]
      for (const car of cars) {
        this.carData.getCarById(car).then((car) => {
          if (car) {
            this.cars.push(car);
          }
        })
      }
    }
  }

  fillSeats() {
    if (this.tour != null) {
      let maxSeats = this.tour.seats;
      if (this.tour.passengers.length > 0) {
        for (const passenger of this.tour.passengers) {
          maxSeats = maxSeats - passenger.seats;
        }
      }

      for (let i = 0; i <= maxSeats; i++) {
        this.seats.push(i);
      }
    }
  }

  fillStorage() {
    if (this.tour != null) {
      let maxStorage = this.tour.seats;
      if (this.tour.passengers.length > 0) {
        for (const passenger of this.tour.passengers) {
          maxStorage = maxStorage - passenger.storage;
        }
      }

      for (let i = 0; i <= maxStorage; i++) {
        this.storage.push(i);
      }
    }
  }


 async bookIfNoOffer(carId: string) {
    if (carId.trim().length <= 0) {
      this.alertData.showAlert({type: 'danger', message: 'Sie müssen ein Auto auswählen'})
    } else {
      if (this.tour && this.userData.currUser) {
        this.tour.car = carId;
        this.tour.driver = this.userData.currUser.uid;
        this.tour.isBooked = true;
        this.tour.areSeatsOccupied = true;
        this.tour.isStorageFullyLoaded = true;
        await this.updateTour();
        this.alertData.showAlert({type: 'success', message: 'Buchung war erfolgreich!'});
        this.activeModal.dismiss();
      } else {
        this.alertData.showAlert({type:'danger', message: 'Etwas ist schief gelaufen'})
      }
    }
  }

 async bookIfOffer(seats: string, storage: string) {
    if (Number.parseInt(seats) === 0 && Number.parseInt(storage) === 0) {
      this.alertData.showAlert({type: 'danger', message: 'Sie können keine Fahrt mit 0 Sitzplätzen und Stauraum buchen'})
    } else {
      if (this.tour && this.userData.currUser) {
        this.tour.passengers
          .push(
            new Passenger(this.userData.currUser.uid, Number.parseInt(seats), Number.parseInt(storage))
          );
        this.tour.isBooked = true;
        if (this.tour.seats === this.passengerSeats()) {
          this.tour.areSeatsOccupied = true;
        }
        if (this.tour.storage === this.passengerStorage()) {
          this.tour.isStorageFullyLoaded = true;
        }
        await this.updateTour()
        this.alertData.showAlert({type: 'success', message: 'Buchung war erfolgreich!'});
        this.activeModal.dismiss();
      } else {
        this.alertData.showAlert({type:'danger', message: 'Etwas ist schief gelaufen'})
      }
    }
  }

  async updateTour() {
    if (this.tour) {
      await this.tourData.updateTour(this.tour);
      if (this.tour.dID) {
        let tempTour = await this.tourData.getTour(this.tour.dID);
        if (tempTour != undefined) {
          this.shareData.detailTour = tempTour;
        }
      }
    }

  }

  passengerSeats(): number {
    let seats = 0;
    if (this.tour) {
      for (const passenger of this.tour.passengers) {
        seats = seats + passenger.seats;
      }
    }
    return seats;
  }

  passengerStorage(): number {
    let storage = 0;
    if (this.tour) {
      for (const passenger of this.tour.passengers) {
        storage = storage + passenger.storage;
      }
    }
    return storage
  }

}
