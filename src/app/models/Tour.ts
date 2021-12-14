import {Car} from "./Car";
import {Status} from "./Status";

export class Tour {
  dID?: string;
  offer: boolean;
  startCity: string;
  endCity: string;
  startTime: number;
  EndTime: number;
  date: Date;
  price: number;
  storage: number;
  seats: number;
  description: string;
  driver: string; //id of the driver (Die Frage ist nur welche. did oder uid??)
  passengers: string[]; // id of the passengers
  booked: boolean;
  status: Status;
  car: Car | null;
  evaluation: number;

  constructor(offer: boolean, startCity: string, endCity: string, startTime: number, EndTime: number, date: Date,
              price: number, storage: number, seats: number, description: string,
              driver?: string, passengers?: string[], car?: Car) {
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
    this.driver = (driver) ? driver : '';
    this.passengers = (passengers) ? passengers: [];
    this.booked = false;
    this.status = Status.NOSTARTEDYET;
    this.car = (car) ? car : null;
    this.evaluation = -1;
  }
}