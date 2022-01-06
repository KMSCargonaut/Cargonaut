import {Component, Input, OnInit} from '@angular/core';
import {Tour} from "../../../models/Tour";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../../services/alert.service";
import {Passenger} from "../../../models/Passenger";
import {UserService} from "../../../services/user.service";
import {TourService} from "../../../services/tour.service";
import {Car} from "../../../models/Car";
import {CarsService} from "../../../services/cars.service";
import {UserCargo} from "../../../models/UserCargo";

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
              public tourData: TourService, public carData: CarsService) {
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
      let maxStorage = this.tour.storage;
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
    }
    // Frische Daten aus der FB ziehen und vergleichen
    else {
      if (this.tour && this.userData.currUser) {
        const tempId = (this.tour.dID) ? this.tour.dID : '';
        const tempTour = await this.tourData.getTour(tempId);
        const tour = (tempTour) ? tempTour : null;
        if (tour && tour.driver.trim().length === 0) {
          this.tour.car = carId;
          this.tour.driver = this.userData.currUser.uid;
          this.tour.isBooked = true;
          this.tour.areSeatsOccupied = true;
          this.tour.isStorageFullyLoaded = true;

          const tempDriver = await this.userData.getUser(this.tour.driver);
          if (tempDriver) {
            await this.purchaseIfNoOffer(tempDriver, this.tour.passengers, this.tour);
          } else {
            this.alertData.showAlert({type: 'danger', message: 'Buchung ist fehlgeschlagen!'})
          }
        } else {
          this.alertData.showAlert({type: 'danger', message: 'Diese Fahrt ist bereits ausgebucht!'})
        }
      } else {
        this.alertData.showAlert({type: 'danger', message: 'Etwas ist schief gelaufen'})
      }
    }
  }

  async purchaseIfNoOffer(driver: UserCargo, passengers: Passenger[], tour: Tour) {
    const costs = passengers.map(passenger => (passenger.seats + passenger.storage) * tour.price);
    console.log('purchase : ', costs);
    for (let i = 0; i < tour.passengers.length; i++) {
      const customer = await this.userData.getUser(passengers[i].id);
      if (customer) {
        const credit = customer.money;
        let value = credit - costs[i];
        if (value < 0) {
          console.log('-------FAILED: Purchase If NO OFFER ---------');
          console.log('Costs: ', costs[i]);
          console.log('Value: ', value);
          console.log('Customer: ', customer);
          console.log('Driver: ', driver);
          this.alertData.showAlert({
            type: 'danger',
            message: 'Buchung fehlgeschlagen. Ein Mitfahrer hat zu wenig Guthaben!'
          })
        } else {
          customer.money = value;
          driver.money += costs[i];
          console.log('-------Purchase If NO OFFER ---------');
          console.log('Costs: ', costs[i]);
          console.log('Value: ', value);
          console.log('Customer: ', customer);
          console.log('Driver: ', driver);
          await this.userData.updateUser(customer);
          await this.userData.updateUser(driver);
          await this.updateTour(tour)
        }
      }
    }

  }

  async bookIfOffer(seats: string, storage: string) {
    if (Number.parseInt(seats) === 0 && Number.parseInt(storage) === 0) {
      this.alertData.showAlert({
        type: 'danger',
        message: 'Sie können keine Fahrt mit 0 Sitzplätzen und Stauraum buchen'
      })
    } else {
      if (this.tour && this.userData.currUser) {
        const tempId = (this.tour.dID) ? this.tour.dID : '';
        const tempTour = await this.tourData.getTour(tempId);
        const tour = (tempTour) ? tempTour : null;

        if (tour && (!tour.areSeatsOccupied || !tour.isStorageFullyLoaded)) {
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
          const tempDriver = await this.userData.getUser(this.tour.driver);
          const passengerId = this.userData.currUser.uid;
          const currentPassenger = this.tour.passengers.find(passenger => passenger.id === passengerId);
          if (tempDriver && currentPassenger) {
            await this.purchaseIfOffer(tempDriver,currentPassenger, this.tour);
          } else {
            this.alertData.showAlert({type: 'danger', message: 'Buchung ist fehlgeschlagen'})
          }
        } else {
          this.alertData.showAlert({type: 'danger', message: 'Diese Fahrt ist ausgebucht!'})
        }
      } else {
        this.alertData.showAlert({type: 'danger', message: 'Etwas ist schief gelaufen'})
      }
    }
  }

  async purchaseIfOffer(driver: UserCargo, passenger: Passenger, tour: Tour) {
    const cost = (passenger.seats + passenger.storage) * tour.price
    const customer = await this.userData.getUser(passenger.id)

    // Todo: If-Case kommt auch in creat-tours
    if (customer) {
      const value = customer.money - cost;
      if (value < 0) {
        console.log('-------FAILED: Purchase If OFFER ---------');
        console.log('Costs: ', cost);
        console.log('Value: ', value);
        console.log('Customer: ', customer);
        console.log('Driver: ', driver);
        this.alertData.showAlert({
          type: 'danger',
          message: 'Bezahlung war nicht erfolgreich! Laden Sie Ihr Guthaben auf!'
        })
        // Todo: Else-Case bleibt
      } else {
        customer.money = value;
        driver.money += cost;
        console.log('-------Purchase If OFFER ---------');
        console.log('Costs: ', cost);
        console.log('Value: ', value);
        console.log('Customer: ', customer);
        console.log('Driver: ', driver);
        await this.userData.updateUser(customer)
        await this.userData.updateUser(driver)
        await this.updateTour(tour);
      }

    }
  }

  async updateTour(tour: Tour) {
    await this.tourData.updateTour(tour);
    this.alertData.showAlert({type: 'success', message: 'Buchung war erfolgreich!'});
    this.activeModal.dismiss([this.tour, true]);
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
