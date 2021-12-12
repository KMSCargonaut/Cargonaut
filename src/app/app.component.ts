import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import User = firebase.User;
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cargonaut';


  constructor(public auth: AngularFireAuth, public authData: AuthenticationService, private router: Router) {
    console.log(this.router.url)
    if (this.router.url === '/login') {
      this.router.navigate(['/login'])
    } else if (this.router.url === '/profil') {
      this.router.navigate(['/profil'])
    }
  }


  navigateUser() {
    if (this.authData.user) {
      this.router.navigate(['/profil']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
