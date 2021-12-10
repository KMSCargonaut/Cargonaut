import { Injectable } from '@angular/core';
import firebase from "firebase/compat";
import User = firebase.User;
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: User | null | undefined;
  email: string | null | undefined;


  constructor(public auth: AngularFireAuth) {
    this.auth.user.subscribe(async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
      } else {
        this.user = null;
      }
    })
  }



}
