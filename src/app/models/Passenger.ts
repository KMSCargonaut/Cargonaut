export class Passenger {
  id: string;
  seats: number;
  storage: number;


  constructor(id: string, seats: number, storage: number) {
    this.id = id;
    this.seats = seats;
    this.storage = storage;
  }
}
