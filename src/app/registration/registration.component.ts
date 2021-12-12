import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Gender} from "../models/Gender";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {getAuth} from "firebase/auth";
import {AuthenticationService} from "../services/authentication.service";
import {UserCargo} from "../models/UserCargo";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  // ModelBinding
  public email: string;
  public firstname: string;
  public lastname: string;
  public username: string;
  public birthday: Date;
  public password: string;
  public repeatPassword: string;
  public gender: Gender;

  // PropertyBinding for outline color for wrong/no inputs
  public wrongEmailClass = '';
  public wrongFirstname = '';
  public wrongLastname = '';
  public wrongUsername = '';
  public wrongBirthday = '';
  public wrongPasswordClass = '';
  public wrongRepeatPasswordClass = '';

  // Message for wrong/no inputs
  public emailMessage = '';
  public firstnameMessage = '';
  public lastnameMessage = '';
  public usernameMessage = '';
  public birthdayMessage = '';
  public passwordMessage = '';
  public passwordRepeatMessage = '';


  constructor(public activeModal: NgbActiveModal, private router: Router,
              private userService: UserService, private authData: AuthenticationService) {
    this.email = '';
    this.password = '';
    this.repeatPassword = '';
    this.firstname = '';
    this.lastname = '';
    this.username = '';
    this.birthday = new Date();
    this.gender = -1;
  }

  testRegister() {
    console.log(
      "Vorname: " + this.firstname,
      "Nachname: " + this.lastname,
      "Username: " + this.username,
      "Geburtstag: " + this.birthday,
      "gender: " + this.gender,
      "email: " + this.email,
    )
  }

  async register() {
    try {
      await this.authData.register(this.email, this.password);
      const tempAuth = getAuth();
      const tempUser = tempAuth.currentUser;
      this.activeModal.close();
      this.router.navigate(['/profil'])
      if (tempUser) {
        await this.userService.addUser(
          new UserCargo(tempUser.uid, this.firstname, this.lastname, this.username, this.birthday, this.gender)
        );
      }

    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        this.emailMessage = err.message;
        this.wrongEmailClass = 'border-danger';
      } else if (err.code === 'auth/weak-password') {
        this.passwordMessage = err.message;
        this.wrongPasswordClass = 'border-danger';
      }
    }
  }

  async inputCheck() {
    if (this.email.trim().length > 0 &&
      this.password.trim().length > 0 &&
      this.password === this.repeatPassword) {
      await this.register()
    } else {
      if (this.email.trim().length === 0) {
        this.emailMessage = 'Please fill out your email';
        this.wrongEmailClass = 'border-danger';
      }
      if (this.password.trim().length === 0) {
        this.passwordMessage = 'Please fill out your password';
        this.wrongPasswordClass = 'border-danger';
      }
      if (this.repeatPassword.trim().length === 0) {
        this.passwordRepeatMessage = 'Please repeat your password';
        this.wrongRepeatPasswordClass = 'border-danger';
      }
      if (this.repeatPassword !== this.password) {
        this.passwordRepeatMessage = 'The password is not the same';
        this.wrongRepeatPasswordClass = 'border-danger';
      }
    }
  }

  validEmail(input: string): void {
    if (input.trim().length >= 0) {
      this.emailMessage = '';
      this.wrongEmailClass = '';
    }
  }


  validFirstname(inputs: string): void {
  }

  validLastname(inputs: string): void {
  }

  validUsername(inputs: string): void {
  }

  validBirthday(inputs: string): void {
  }

  validPassword(input: string): void {
    if (input.trim().length >= 0) {
      this.passwordMessage = '';
      this.wrongPasswordClass = '';
    }
  }

  validRepeatPassword(input: string): void {
    if (input.trim().length >= 0) {
      this.passwordRepeatMessage = '';
      this.wrongRepeatPasswordClass = '';
    }
  }


}
