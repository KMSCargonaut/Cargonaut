import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RegistrationComponent} from '../registration/registration.component';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public wrongEmail = '';
  public emailMessage = '';
  public wrongPassword = '';
  public passwordMessage = '';

  constructor(private modalService: NgbModal, private auth: AngularFireAuth, public authData: AuthenticationService) {
  }

  openModal(): void {
    const modalReference = this.modalService.open(RegistrationComponent);
    modalReference.result
      .then((result: any) => {
        console.log('Jetzte müsste ein User regestriert sein ', result);
      })
      .catch((err) => {
        console.log('Jetzt müsste sich nur das Modalefenster wieder geschlossen haben ' + err);
      });
  }

  inputCheck(email: string, password: string): void {
    if (email.trim().length === 0 && password.trim().length === 0) {
      this.wrongEmail = 'border-danger';
      this.wrongPassword = 'border-danger';
      this.passwordMessage = 'Please fill out your password';
      this.emailMessage = 'Please fill out your email';
    } else if (email.trim().length === 0) {
      this.emailMessage = 'Please fill out your email';
      this.wrongEmail = 'border-danger';
    } else if (password.trim().length === 0) {
      this.wrongPassword = 'border-danger';
      this.passwordMessage = 'Please fill out your password';
    } else {
      this.wrongEmail = '';
      this.auth.signInWithEmailAndPassword(email, password).then(result => {
        console.log(result);
      }).catch((err) => {
        if (err.code === 'auth/invalid-email') {
          this.emailMessage = 'E-Mail falsch formatiert';
          this.wrongEmail = 'border-danger';
        } else {
          this.passwordMessage = 'Passwort falsch formatiert';
          this.wrongPassword = 'border-danger';
        }
      });
    }
  }


  loginWithGoogle(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
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
