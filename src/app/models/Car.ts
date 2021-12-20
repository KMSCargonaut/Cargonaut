export class Car {
  id?: string;
  model: string;
  mark: string;
  seats: number;
  storage: number;


  constructor(model: string, mark: string, seats: number, storage: number) {
    this.model = model;
    this.mark = mark;
    this.seats = seats;
    this.storage = storage;
  }
}
