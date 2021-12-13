import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})
export class CarlistComponent {

  form = new FormGroup({
    fahrzeugModel: new FormControl(),
    fahrzeugKennzeichen: new FormControl(),
    fahrzeugSitzplaetze: new FormControl(),
    fahrzeugStauraum: new FormControl()
  });

  constructor() { }

  onSubmit(){
    return 1+1
  }
}
