import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Car} from "../../../models/Car";

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent{

  @Input() car: Car = ({} as any) as Car;
  @Output() deleteEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() editEvent: EventEmitter<void> = new EventEmitter<void>();


  constructor(public userService: UserService) { }

}
