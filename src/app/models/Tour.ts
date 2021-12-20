import {Status} from "./Status";

export class Tour {
  dID?: string;
  offer: boolean;
  startCity: string;
  endCity: string;
  startTime: string;
  duration: number;
  date: string;
  price: number;
  storage: number;
  seats: number;
  description: string;
  driver: string; //id of the driver (Die Frage ist nur welche. did oder uid??)
  passengers: string[]; // id of the passengers
  booked: boolean;
  status: Status;
  car: string;
  evaluation: number;

  constructor(offer: boolean, startCity: string, endCity: string, startTime: string, duration: number, date: string,
              price: number, storage: number, seats: number, description?: string,
              driver?: string, passengers?: string[], car?: string) {
    this.offer = offer;
    this.startCity = startCity;
    this.endCity = endCity;
    this.startTime = startTime;
    this.duration = duration;
    this.date = date;
    this.price = price;
    this.storage = storage;
    this.seats = seats;
    this.description = (description) ? description: '';
    this.driver = (driver) ? driver : '';
    this.passengers = (passengers) ? passengers: [];
    this.booked = false;
    this.status = Status.NOSTARTEDYET;
    this.car = (car) ? car : '';
    this.evaluation = -1;
  }

}
