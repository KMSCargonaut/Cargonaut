import { Component, OnInit } from '@angular/core';

import {UserService} from "../../services/user.service";
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";
import {UserCargo} from "../../models/UserCargo";
import {getAuth} from "firebase/auth";
import { time } from 'console';


@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent  {

  constructor(public activeModal: NgbActiveModal, private router: Router, public userData: UserService) { }


  // ModelBinding
  public email = '';

  public password = '';
  public repeatPassword = '';


  // PropertyBinding for outline color for wrong/no inputs
  public wrongEmailClass = '';

  public wrongPasswordClass = '';
  public wrongRepeatPasswordClass = '';

  // Message for wrong/no inputs
  public emailMessage = '';

  public passwordMessage = '';
  public passwordRepeatMessage = '';







  public async inputCheck() {
    if (this.email.trim().length > 0 &&
      this.password.trim().length > 0 &&

      this.password === this.repeatPassword) {

    } else {
      if (this.email.trim().length === 0) {
        this.emailMessage = 'Geben Sie Ihre E-Mail an';
        this.wrongEmailClass = 'border-danger';
      }
      if (this.password.trim().length === 0) {
        this.passwordMessage = 'Geben Sie ein Passwort an';
        this.wrongPasswordClass = 'border-danger';
      }
      if (this.repeatPassword.trim().length === 0) {
        this.passwordRepeatMessage = 'Wiederholen Sie Ihr Passwort';
        this.wrongRepeatPasswordClass = 'border-danger';
      }
      if (this.repeatPassword !== this.password) {
        this.passwordRepeatMessage = 'Die Passwörter sind nicht identisch';
        this.wrongRepeatPasswordClass = 'border-danger';
      }

    }
  }

  public validEmail(input: string): void {
    if (input.trim().length >= 0) {
      this.emailMessage = '';
      this.wrongEmailClass = '';
    }
  }



  public validPassword(input: string): void {
    if (input.trim().length >= 0) {
      this.passwordMessage = '';
      this.wrongPasswordClass = '';
    }
  }


  public validRepeatPassword(input: string): void {
    if (input.trim().length >= 0) {
      this.passwordRepeatMessage = '';
      this.wrongRepeatPasswordClass = '';
    }
  }



}
