import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private authData: UserService) {
  }


  mobileToggle(nav: any, mobile: any) {
    const visi = nav.getAttribute('data-visible')
    if (visi === 'false') {
      nav.setAttribute('data-visible', true);
      mobile.setAttribute('aria-expanded', true)
    } else {
      nav.setAttribute('data-visible', false)
      mobile.setAttribute('aria-expanded', false)
    }
  }

  navigateToUser() {
    this.router.navigate(['/profil'])
  }

  navigateToTours(){
    this.router.navigate(['/tours'])
  }

  navigateToMainPage() {
    this.router.navigate(['/'])
  }

  navigateToCreateTourPage() {
    this.router.navigate(['/createTours']);
  }

}
