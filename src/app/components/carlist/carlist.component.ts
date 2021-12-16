import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Car} from "../../models/Car";
import {Router} from "@angular/router";

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})

export class CarlistComponent {
  public fahrzeugModel?: string;
  public fahrzeugKennzeichen?: string;
  public fahrzeugSitzplaetze?: number;
  public fahrzeugStauraum?: number;

  form = new FormGroup({
    fahrzeugModel: new FormControl(),
    fahrzeugKennzeichen: new FormControl(),
    fahrzeugSitzplaetze: new FormControl(),
    fahrzeugStauraum: new FormControl()
  });

  constructor(public userService: UserService, private router: Router) {
    if(!this.userService.currUser){
      this.router.navigate(['/']);
    }
  }

  onSubmit(){
     this.fahrzeugModel = this.form.controls['fahrzeugModel'].value;
     this.fahrzeugKennzeichen = this.form.controls['fahrzeugKennzeichen'].value;
     this.fahrzeugSitzplaetze = this.form.controls['fahrzeugSitzplaetze'].value;
     this.fahrzeugStauraum = this.form.controls['fahrzeugStauraum'].value;

     if (this.fahrzeugModel && this.fahrzeugKennzeichen && this.fahrzeugSitzplaetze && this.fahrzeugStauraum) {

       let newCar = new Car(this.fahrzeugModel, this.fahrzeugKennzeichen, this.fahrzeugSitzplaetze, this.fahrzeugStauraum);

       if(this.userService.currUser){
         this.userService.currUser.car.push(newCar);
         this.userService.updateUser(this.userService.currUser).then();
       }
       (document.getElementById('add-car-form') as HTMLFormElement).reset();
     }

  }

}
