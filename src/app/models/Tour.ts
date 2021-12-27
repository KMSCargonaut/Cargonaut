import {Status} from "./Status";

export class Tour {
  dID?: string;
  creatorID: string
  isOffer: boolean;
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
  isBooked: boolean;
  areSeatsOccupied: boolean;
  isStorageFullyLoaded: boolean;
  status: Status;
  car: string;
  evaluation: number;

  constructor(creatorID:string, offer: boolean, startCity: string, endCity: string, startTime: string, duration: number, date: string,
              price: number, storage: number, seats: number, description?: string,
              driver?: string, passengers?: string[], car?: string) {
    this.creatorID = creatorID;
    this.isOffer = offer;
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
    this.isBooked = false;
    this.areSeatsOccupied = (this.seats === 0);
    this.isStorageFullyLoaded = (this.storage === 0);
    this.status = Status.NOSTARTEDYET;
    this.car = (car) ? car : '';
    this.evaluation = -1;
  }

}
