import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Car} from "../../../models/Car";
import {CarsService} from "../../../services/cars.service";

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent implements OnInit{

  @Input() carId: string = '';
  @Output() deleteEvent: EventEmitter<void> = new EventEmitter<void>();
  // @Output() editEvent: EventEmitter<void> = new EventEmitter<void>();

  car: Car | null = null


  constructor(public userService: UserService, public carData: CarsService) { }

  async ngOnInit() {
    this.car = await this.carData.getCarById(this.carId);
  }

}
