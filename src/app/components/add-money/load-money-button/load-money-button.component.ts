import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-load-money-button',
  templateUrl: './load-money-button.component.html',
  styleUrls: ['./load-money-button.component.css']
})
export class LoadMoneyButtonComponent{

  constructor() { }

  @Input() amount: number = 0;
  @Output() chosenAmount = new EventEmitter<number>();

  chosenMe(amount: number) {
    this.chosenAmount.emit(amount)
  }
}
