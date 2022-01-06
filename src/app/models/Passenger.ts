export class Passenger {
  id: string;
  seats: number;
  storage: number;
  evaluated: number;
  payed: boolean;


  constructor(id: string, seats: number, storage: number) {
    this.id = id;
    this.seats = seats;
    this.storage = storage;
    this.evaluated = -1;
    this.payed = false;
  }
}
