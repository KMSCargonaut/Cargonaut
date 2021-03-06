import {Status} from "./Status";
import {Passenger} from "./Passenger";
import {UserCargo} from "./UserCargo";

export class Tour {
  dID?: string;
  creator: UserCargo;
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
  passengers: Passenger[]; // id of the passengers
  isBooked: boolean; // es gibt mindestesn eine Buchung
  areSeatsOccupied: boolean; // Sitze belegt
  isStorageFullyLoaded: boolean; // Stauraum voll
  status: Status;
  car: string;
  evaluation: number;

  constructor(creator: UserCargo, offer: boolean, startCity: string, endCity: string, startTime: string, duration: number, date: string,
              price: number, storage: number, seats: number, description?: string,
              driver?: string, passengers?: Passenger[], car?: string) {
    this.creator = creator;
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
