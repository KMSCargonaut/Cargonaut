import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-slide-checker',
  templateUrl: './slide-checker.component.html',
  styleUrls: ['./slide-checker.component.css']
})
export class SlideCheckerComponent{

  @Output() changeState: EventEmitter<boolean>;

  constructor() {
    this.changeState = new EventEmitter<boolean>();
  }

}
