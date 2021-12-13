import {Time} from "@angular/common";
import {UserCargo} from "./UserCargo";
import {Car} from "./Car";
import {Status} from "./Status";

export class Tour {
id?: string;
offer?: boolean;
startCity?: string;
endCity?: string;
startTime?: Time;
EndTime?: Time;
date?: Date;
price?: number;
storage?: number;
seats?: number;
description?: string;
driver?: UserCargo;
passengers?: UserCargo[];
booked?: boolean;
status?: Status;
car?: Car;
evaluation?: number;


  constructor(id?: string, offer?: boolean, startCity?: string, endCity?: string, startTime?: Time, EndTime?: Time, date?: Date, price?: number, storage?: number, seats?: number, description?: string, driver?: UserCargo, passengers?: UserCargo[], booked?: boolean, status?: Status, car?: Car, evaluation?: number) {
    this.id = id;
    this.offer = offer;
    this.startCity = startCity;
    this.endCity = endCity;
    this.startTime = startTime;
    this.EndTime = EndTime;
    this.date = date;
    this.price = price;
    this.storage = storage;
    this.seats = seats;
    this.description = description;
    this.driver = driver;
    this.passengers = passengers;
    this.booked = booked;
    this.status = status;
    this.car = car;
    this.evaluation = evaluation;
  }
}
