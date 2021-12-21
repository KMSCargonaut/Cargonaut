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
     this.fahrzeugModel = this.form.controls['fahrzeugModel'].value;
     this.fahrzeugKennzeichen = this.form.controls['fahrzeugKennzeichen'].value;
     this.fahrzeugSitzplaetze = this.form.controls['fahrzeugSitzplaetze'].value;
     this.fahrzeugStauraum = this.form.controls['fahrzeugStauraum'].value;

     if (this.fahrzeugModel && this.fahrzeugKennzeichen && this.fahrzeugSitzplaetze && this.fahrzeugStauraum) {

       let newCar = new Car(this.fahrzeugModel, this.fahrzeugKennzeichen, this.fahrzeugSitzplaetze, this.fahrzeugStauraum);

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
