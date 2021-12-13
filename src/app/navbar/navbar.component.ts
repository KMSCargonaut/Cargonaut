import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private authData: UserService) {
  }

  navigateToUser() {
      this.router.navigate(['/profil'])
  }

  navigateToMainPage() {
    this.router.navigate(['/'])
  }

}
