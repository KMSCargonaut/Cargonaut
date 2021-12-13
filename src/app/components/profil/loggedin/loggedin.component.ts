import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent {


  constructor(public userData: UserService) {
  }

  async logout(): Promise<void> {
    await this.userData.logout();
  }

  async deleteAccount(): Promise<void> {
    await this.userData.deleteUser();
    await this.userData.deleteAccount();
    console.log('User deleted');
  }
}
