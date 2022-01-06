import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ShareDataService} from "../../services/share-data.service";
import {ConfirmService} from "../../services/confirm.service";
import {Confirm} from "../../models/Confirm";
import {Tour} from "../../models/Tour";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";
import {TourService} from "../../services/tour.service";

@Component({
  selector: 'app-tour-confirm',
  templateUrl: './tour-confirm.component.html',
  styleUrls: ['./tour-confirm.component.css']
})
export class TourConfirmComponent implements OnInit {


  code: string = '';
  alreadyCreated = false;
  alreadyPaid = false;
  pos1: string = '';
  pos2: string = '';
  pos3: string = '';
  pos4: string = '';
  pos5: string = '';
  pos6: string = '';
  pos7: string = '';
  pos8: string = '';
  wrongInput = '';
  inputMessage = '';

  constructor(public activeModal: NgbActiveModal, public shareData: ShareDataService, public confirmData: ConfirmService,
              public userData: UserService, public alertData: AlertService, public tourData: TourService) {
  }

  async ngOnInit() {
    const tour = this.shareData.confirmTour
    if (tour && tour.dID) {
      const confirm = await this.confirmData.findConfirmationByTourId(tour.dID)
      if (confirm && confirm.length != 0) {
        this.alreadyCreated = true;
        this.code = confirm[0].code;
      }
    const passenger = tour.passengers.find(passenger => passenger.id === this.userData.currUser?.uid);
      if (passenger) {
        if (passenger.payed) {
          console.log(passenger);
          this.alreadyPaid = true;
        }
      }
    }
  }

  async randomizedCode() {
    this.code = this.makeid(8)
    console.log(this.code)
  }

  validInput(input: string) {
    if (input.trim().length >= 0) {
      this.inputMessage = '';
      this.wrongInput = '';
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  async confirmCode() {
    const tour = this.shareData.confirmTour
    if (tour && tour.dID) {
      const confirm = await this.confirmData.findConfirmationByTourId(tour.dID)
      if (confirm && confirm.length != 0) {
        const inputCode = this.pos1 + this.pos2 + this.pos3 + this.pos4 + this.pos5 + this.pos6 + this.pos7 + this.pos8;
        if (confirm[0].code === inputCode) {
          await this.purchase(tour)
        } else {
          this.wrongInput = 'border-danger';
          this.inputMessage = 'Der Code ist nicht richtig'
          this.alertData.showAlert({type: 'danger', message: 'Code ist nicht richtig!'})
        }
      } else {
        this.activeModal.dismiss();
        this.alertData.showAlert({type: 'danger', message: 'Der Code wurde noch nicht erstellt!'})
      }
    }
  }

  async createCode() {
    const tour = this.shareData.confirmTour;
    if (tour && tour.dID) {
      await this.randomizedCode();
      await this.confirmData.addConfirm(new Confirm(tour.dID, this.code))
      this.alreadyCreated = true;
    }
  }

  async purchase(tour: Tour) {
    if (this.userData.currUser) {
      const currPassenger = tour.passengers.find(passenger => passenger.id === this.userData.currUser?.uid);
      if (currPassenger) {
        const currUser = await this.userData.getUser(currPassenger.id);

        if (currUser) {
          const costs = (currPassenger.seats + currPassenger.storage) * tour.price;
          const credit = currUser.money - costs;
          if (credit < 0) {
            this.activeModal.dismiss();
            this.alertData.showAlert({
              type: 'danger',
              message: 'Bezahlung war nicht erfolgreich! Laden Sie Ihr Guthaben auf!'
            })
        } else {
            const driver = await this.userData.getUser(tour.driver);
            console.log(driver)
            console.log(credit)
            console.log(currUser);
            if (driver) {
              currUser.money = credit;
              driver.money += costs;
              const tempPassenger = tour.passengers.find(passenger => passenger.id === currUser.uid);
              if (tempPassenger) {
                tempPassenger.payed = true;
                await this.tourData.updateTour(tour);
              }
              await this.userData.updateUser(currUser)
              await this.userData.updateUser(driver)
              this.activeModal.dismiss();
              this.alertData.showAlert({type: 'success', message: 'Bezahlung war erfolgreich!'})
            }
          }
        }
      }
    }
  }

}
