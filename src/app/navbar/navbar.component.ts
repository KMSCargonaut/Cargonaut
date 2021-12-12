import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private authData: AuthenticationService) {
  }

  navigateToUser() {
    if (this.authData.user) {
      this.router.navigate(['/profil'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  navigateToMainPage() {
    this.router.navigate(['/'])
  }

}
