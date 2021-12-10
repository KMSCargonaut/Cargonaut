import { Component } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import User = firebase.User;
import {AuthenticationService} from "./authentication.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cargonaut';


  constructor(public auth: AngularFireAuth, public authData: AuthenticationService) {
  }

  logout(): void {
    this.auth.signOut().then(() => {
      console.log('logged out');
    });
  }
}
