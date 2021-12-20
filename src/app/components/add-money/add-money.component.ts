import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent{

  smallAmount = 20;
  midAmount = 100;
  bigAmount = 250;
  hugeAmount = 500;


  constructor(public activeModal: NgbActiveModal, private router: Router,
              private userData: UserService) { }


}
