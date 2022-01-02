import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShareDataService} from "../../services/share-data.service";

@Component({
  selector: 'app-slide-checker',
  templateUrl: './slide-checker.component.html',
  styleUrls: ['./slide-checker.component.css']
})
export class SlideCheckerComponent {

  @Input() checkedChecker = false;
  @Output() changeState: EventEmitter<boolean>;

  constructor(public shareData: ShareDataService) {
    this.changeState = new EventEmitter<boolean>();
  }

}
