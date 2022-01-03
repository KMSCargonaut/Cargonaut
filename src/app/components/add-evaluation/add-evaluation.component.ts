import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.css']
})
export class AddEvaluationComponent {

  constructor(public activeModal: NgbActiveModal) { }

  evaluate(stars: string) {
    console.log(stars);
  }

}
