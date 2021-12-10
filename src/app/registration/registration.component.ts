import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public email: string;
  public password: string;
  public repeatPassword: string;

  public wrongEmailClass = '';
  public wrongPasswordClass = '';
  public wrongRepeatPasswordClass = '';
  public emailMessage = '';
  public passwordMessage = '';
  public passwordRepeatMessage = '';

  constructor(public activeModal: NgbActiveModal, private auth: AngularFireAuth) {
    this.email = '';
    this.password = '';
    this.repeatPassword = '';
  }

  ngOnInit(): void {
  }

  register(): void {
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

    if (this.email.trim().length > 0 && this.password.trim().length > 0 && this.password === this.repeatPassword) {
      this.auth.createUserWithEmailAndPassword(this.email, this.password).then(() => {
        this.activeModal.close();
      }).catch((err) => {
        if (err.code === 'auth/invalid-email') {
          this.emailMessage = err.message;
          this.wrongEmailClass = 'border-danger';
        } else if (err.code === 'auth/weak-password') {
          this.passwordMessage = err.message;
          this.wrongPasswordClass = 'border-danger';
        }
      });

    }
  }

  validEmail(input: string): void {
    if (input.trim().length >= 0) {
      this.emailMessage = '';
      this.wrongEmailClass = '';
    }
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
