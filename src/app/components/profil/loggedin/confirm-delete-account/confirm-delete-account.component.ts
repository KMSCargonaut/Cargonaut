import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirm-delete-account',
  templateUrl: './confirm-delete-account.component.html',
  styleUrls: ['./confirm-delete-account.component.css']
})
export class ConfirmDeleteAccountComponent {

  constructor(public activeModal: NgbActiveModal) { }


}
