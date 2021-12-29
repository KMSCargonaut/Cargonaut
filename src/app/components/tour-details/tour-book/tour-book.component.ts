import {Component, Input, OnInit} from '@angular/core';
import {Tour} from "../../../models/Tour";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-tour-book',
  templateUrl: './tour-book.component.html',
  styleUrls: ['./tour-book.component.css']
})
export class TourBookComponent implements OnInit {

  @Input() public passedData: any;
  tour: Tour | null = null;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.tour = {...this.passedData};
  }

}
