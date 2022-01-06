export class Confirm {
  dId?: string;
  tourId: string = '';
  code: string = '';


  constructor(tourId: string, code: string) {
    this.tourId = tourId;
    this.code = code;
  }
}
