import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  constructor(public authData: AuthenticationService, public auth: AngularFireAuth, private router: Router) { }

  async logout(): Promise<void> {
    await this.authData.logout();
    await this.router.navigate(['/']);
  }

  async deleteAccount(): Promise<void> {
    await this.authData.deleteAccount();
    await this.router.navigate(['/']);
    console.log('User deleted');
  }

}
