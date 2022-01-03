import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Car} from "../../models/Car";
import {Router} from "@angular/router";
import {CarsService} from "../../services/cars.service";

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})

export class CarlistComponent {
  public carModel?: string;
  public carMark?: string;
  public carSeats?: number;
  public carStorage?: number;

  form = new FormGroup({
    carModel: new FormControl(),
    carMark: new FormControl(),
    carSeats: new FormControl(),
    carStorage: new FormControl()
  });

  constructor(public userService: UserService, private router: Router, public carData: CarsService) {
    if(!this.userService.currUser){
      this.router.navigate(['/']);
    }
  }

  async deleteCar(id: string) {
    await this.userService.deleteCar(id);
    await this.carData.deleteCar(id);
  }

  onSubmit(){
     this.carModel = this.form.controls['carModel'].value;
     this.carMark = this.form.controls['carMark'].value;
     this.carSeats = this.form.controls['carSeats'].value;
     this.carStorage = this.form.controls['carStorage'].value;

     if (this.carModel && this.carMark && this.carSeats && this.carStorage) {

       let newCar = new Car(this.carModel, this.carMark, this.carSeats, this.carStorage);

       if(this.userService.currUser){
         this.carData.addCar(newCar).then(async (id) => {
           console.log(id);
           await this.userService.addCar(id)
         })

       }
       (document.getElementById('add-car-form') as HTMLFormElement).reset();
     }

  }

}
