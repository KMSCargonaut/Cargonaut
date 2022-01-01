import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";
import {UserCargo} from "../../../../models/UserCargo";
import {getAuth} from "firebase/auth";
//import { time } from 'console';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent{

  //Checking Input
  public firstname = this.userData.currUser?.firstname ? this.userData.currUser.firstname: '';
  public lastname = this.userData.currUser?.lastname ? this.userData.currUser.lastname : '';
  public username = this.userData.currUser?.username ? this.userData.currUser.username : '';
  public birthday: Date | null | undefined = this.userData.currUser?.birthday ? this.userData.currUser.birthday : undefined;
  public gender = this.userData.currUser?.gender ? this.userData.currUser.gender : '';

  // PropertyBinding for outline color for wrong/no inputs
  public wrongFirstname = '';
  public wrongLastname = '';
  public wrongUsername = '';
  public wrongBirthday = '';
  public wrongGender = '';
  public wrongRepeatPasswordClass = '';

  // Message for wrong/no inputs
  public firstnameMessage = '';
  public lastnameMessage = '';
  public usernameMessage = '';
  public birthdayMessage = '';
  public genderMessage = '';
  public passwordRepeatMessage = '';

  constructor(public activeModal: NgbActiveModal, private router: Router, public userData: UserService) { }

  public async updateUser(){
    if(this.userData.currUser){
      await this.userData.updateUser(this.userData.currUser);
    }
  }

  public async inputCheck() {
    if (this.lastname.trim().length > 0 &&
      this.gender.trim().length > 0 &&
      this.username.trim().length > 0 &&
      this.birthday != undefined) {
      await this.updateUser();
    } else {
      if (this.firstname.trim().length === 0) {
        this.firstnameMessage = 'Geben Sie Ihren Vornamen an';
        this.wrongFirstname = 'border-danger';
      }
      if (this.lastname.trim().length === 0) {
        this.lastnameMessage = 'Geben Sie Ihren Nachnamen an';
        this.wrongLastname = 'border-danger';
      }
      if (this.username.trim().length === 0) {
        this.usernameMessage = 'Geben Sie einen Nutzername an';
        this.wrongUsername = 'border-danger';
      }
      if (this.gender.trim().length === 0) {
        this.genderMessage = 'Geben Sie Ihr Geschlecht an';
        this.wrongGender = 'border-danger';
      }
      if (this.birthday === undefined) {
        this.birthdayMessage = 'Geben Sie Ihren Geburtstag an';
        this.wrongBirthday = 'border-danger';
      }
    }
  }


  public validFirstname(input: string): void {
    if (input.trim().length >= 0) {
      this.firstnameMessage = '';
      this.wrongFirstname = '';
    }
  }

  public validLastname(input: string): void {
    if (input.trim().length >= 0) {
      this.lastnameMessage = '';
      this.wrongLastname = '';
    }
  }

  public validUsername(input: string): void {
    if (input.trim().length >= 0) {
      this.usernameMessage = '';
      this.wrongUsername = '';
    }
  }

  public validBirthday(input: string): void {
    console.log(input)
    if (input.trim().length >= 0) {
      this.birthdayMessage = '';
      this.wrongBirthday = '';
    }
  }

  public validGender(input: string) {
    console.log(input)
    if (input.trim().length >= 0) {
      this.genderMessage = '';
      this.wrongGender = '';
    }
  }


}
