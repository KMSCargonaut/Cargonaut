import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-load-money-button',
  templateUrl: './load-money-button.component.html',
  styleUrls: ['./load-money-button.component.css']
})
export class LoadMoneyButtonComponent{

  constructor() { }

  @Input() amount: number = 0;

}
