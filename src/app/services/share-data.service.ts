import { Injectable } from '@angular/core';
import {UserCargo} from "../models/UserCargo";
import {Tour} from "../models/Tour";

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  detailUser: UserCargo | null = null
  detailTour: Tour | null = null;
  tourSearch: Tour[] | null = null;
  searchSeats = 0; //wieviele Seats sucht der User
  searchStorage = 0; //wieviel Storage sucht der User

  constructor() { }
}
