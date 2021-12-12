import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {RegistrationComponent} from '../registration/registration.component';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {AuthenticationService} from "../services/authentication.service";
import {animation} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public wrongEmail = '';
  public emailMessage = '';
  public wrongPassword = '';
  public passwordMessage = '';

  constructor(private modalService: NgbModal, private auth: AngularFireAuth, public authData: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  openModal(): void {
    const modalReference = this.modalService.open(RegistrationComponent, {
      animation: true,
    });
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
        this.router.navigate(['/profil']);
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
