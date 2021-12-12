import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
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
        console.log("Ich bin jetzt da: " + user)
      } else {
        this.user = null;
      }
    })
  }

  async logout(): Promise<void> {
    this.auth.signOut().then(() => {
      console.log('logged out');
    });
  }

  async deleteAccount(): Promise<void> {
    firebase.auth().currentUser?.delete();
  }

  async register(email: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(email, password);
  }

}
