import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  constructor(public authData: AuthenticationService, public auth: AngularFireAuth) { }


}
