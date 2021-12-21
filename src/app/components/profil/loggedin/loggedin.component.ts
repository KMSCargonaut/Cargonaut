import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {RegistrationComponent} from "../../registration/registration.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddMoneyComponent} from "../../add-money/add-money.component";

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent {


  constructor(public userData: UserService, private router: Router, public modalService: NgbModal) {
  }

  async logout(): Promise<void> {
    await this.userData.logout();
  }

  async deleteAccount(): Promise<void> {
    await this.userData.deleteUser();
    await this.userData.deleteAccount();
    console.log('User deleted');
  }

  navigateToCarList() {
    this.router.navigate(['/carList'])
  }

  openRegistrationModal(): void {
    this.modalService.open(AddMoneyComponent, {
      animation: true,
      centered: true,
      size: "xl"
    });
  }
}
