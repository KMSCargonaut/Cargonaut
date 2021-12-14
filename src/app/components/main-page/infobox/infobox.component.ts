import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.css']
})
export class InfoboxComponent{

  @Input() boxTitle = '';
  @Input() infoText = '';
  @Input() imagePath = '';
  constructor() { }

}
