import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {UpdateUserComponent} from "./update-user/update-user.component";
import { updateCurrentUser } from 'firebase/auth';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent {

  currentRate = 3;

  constructor(config: NgbModalConfig, private modalService: NgbModal, public userData: UserService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  openUpdateModal(): void {
    this.modalService.open(UpdateUserComponent, {
      animation: true,
      centered: true
    });
  }

  open(content: any) {
    this.modalService.open(content);
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
