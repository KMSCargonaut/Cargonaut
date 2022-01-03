import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  constructor(public userData: UserService) {}



}
