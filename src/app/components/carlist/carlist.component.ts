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
    let newCar = new Car(this.form.value.fahrzeugModel, this.form.value.fahrzeugKennzeichen, this.form.value.fahrzeugSitzplaetze, this.form.value.fahrzeugStauraum);
    if(this.userService.currUser){
      this.userService.currUser.car.push(newCar);
      this.userService.updateUser(this.userService.currUser).then();
    }
    (document.getElementById('add-car-form') as HTMLFormElement).reset();
  }

  editCar(mark: string){

  }
}
