import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.css']
})
export class AddEvaluationComponent {

  constructor(public activeModal: NgbActiveModal, public userData: UserService) {
  }

  async evaluate(stars: string) {
    console.log(stars);
    this.activeModal.dismiss(stars);
  }

}
