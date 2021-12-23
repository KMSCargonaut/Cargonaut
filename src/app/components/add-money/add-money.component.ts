import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent{

  smallAmount = 20;
  midAmount = 100;
  bigAmount = 250;
  hugeAmount = 500;
  chosenAmount = 0;


  constructor(public activeModal: NgbActiveModal, private router: Router,
              public userData: UserService, public alert: AlertService) { }

  newAmountValue(amount: number) {
    this.chosenAmount = amount;
    console.log(this.chosenAmount)
  }

  addMoney() {
    this.userData.addMoney(this.chosenAmount);
    this.activeModal.dismiss();
    this.alert.showAlert({type: 'success', message: `Du hast erfolgreich ${this.chosenAmount}€ aufgeladen!`})
  }

}
