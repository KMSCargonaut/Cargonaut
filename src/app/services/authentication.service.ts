import {Injectable} from '@angular/core';
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
        console.log('user still logged in')
      } else {
        this.user = null;
      }
    })
  }

  async login(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password);
      console.log('logged in');
  }

  async logout() {
    await this.auth.signOut();
    console.log('logged out');
  }

  async deleteAccount() {
    await firebase.auth().currentUser?.delete();
    console.log('deleted account');
  }

  async register(email: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    console.log('created account')
  }

}
