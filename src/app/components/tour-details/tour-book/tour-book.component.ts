import {Component, Input, OnInit} from '@angular/core';
import {Tour} from "../../../models/Tour";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../../services/alert.service";

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

  constructor(public activeModal: NgbActiveModal, public alertData: AlertService) {
  }

  ngOnInit(): void {
    this.tour = {...this.passedData};
    this.fillSeats();
    this.fillStorage();
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

  checkInputs(seats: string, storage: string) {
    if (Number.parseInt(seats) === 0 && Number.parseInt(storage) === 0) {
      this.alertData.showAlert({type: 'danger', message: 'Sie können keine Fahrt mit 0 Sitzplätzen und Stauraum buchen'})
    } else {
    //  .....
      this.alertData.showAlert({type: 'success', message: 'Buchung war erfolgreich!'})
    }
  }

}
