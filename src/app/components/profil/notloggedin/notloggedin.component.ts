import {Component} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RegistrationComponent} from "../../registration/registration.component";

@Component({
  selector: 'app-notloggedin',
  templateUrl: './notloggedin.component.html',
  styleUrls: ['./notloggedin.component.css']
})
export class NotloggedinComponent {

  // ModelBinding
  public email = '';
  public password = '';

  // PropertyBinding for outline color for wrong/no inputs
  public wrongEmail = '';
  public wrongPassword = '';

  // Message for wrong/no inputs
  public emailMessage = '';
  public passwordMessage = '';

  constructor(private modalService: NgbModal, public userData: UserService) {
  }

  openRegistrationModal(): void {
    this.modalService.open(RegistrationComponent, {
      animation: true,
      centered: true
    });
  }

  async inputCheck() {
    if (this.email.trim().length === 0 && this.password.trim().length === 0) {
      this.wrongEmail = 'border-danger';
      this.wrongPassword = 'border-danger';
      this.passwordMessage = 'Please fill out your password';
      this.emailMessage = 'Please fill out your email';
    } else if (this.email.trim().length === 0) {
      this.emailMessage = 'Please fill out your email';
      this.wrongEmail = 'border-danger';
    } else if (this.password.trim().length === 0) {
      this.wrongPassword = 'border-danger';
      this.passwordMessage = 'Please fill out your password';
    } else {
      this.wrongEmail = '';
      await this.login();
    }
  }

  async login() {
    this.userData.login(this.email, this.password).then(() => {
    }).catch((err) => {
      if (err.code === 'auth/invalid-email') {
        this.emailMessage = 'E-Mail falsch formatiert';
        this.wrongEmail = 'border-danger';
      }
      if (err.code === 'auth/wrong-password') {
        this.passwordMessage = 'Falsches Passwort';
        this.wrongPassword = 'border-danger';
      }
      if (err.code === 'auth/user-not-found') {
        this.emailMessage = 'Nutzer nicht gefunden';
        this.wrongEmail = 'border-danger';
      }
    });
  }


  validEmail(input: string): void {
    if (input.trim().length >= 0) {
      this.wrongEmail = '';
      this.emailMessage = '';
    }
  }


  validPassword(input: string): void {
    if (input.trim().length >= 0) {
      this.wrongPassword = '';
      this.passwordMessage = '';
    }
  }

}
