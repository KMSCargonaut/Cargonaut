import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {getAuth} from "firebase/auth";
import {UserCargo} from "../../models/UserCargo";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  // ModelBinding
  public email = '';
  public firstname = '';
  public lastname = '';
  public username = '';
  public birthday = new Date();
  public password = '';
  public repeatPassword = '';
  public gender = '';

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
              private userData: UserService) {}


  async register() {
    try {
      await this.userData.register(this.email, this.password);
      const tempAuth = getAuth();
      const tempUser = tempAuth.currentUser;
      this.activeModal.close();
      this.router.navigate(['/profil'])
      if (tempUser) {
        await this.userData.addUser(
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
