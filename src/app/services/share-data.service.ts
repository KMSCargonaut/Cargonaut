import { Injectable } from '@angular/core';
import {Tour} from "../models/Tour";

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {



  tourSearch: Tour[] | null = null;
  searchSeats = 0; //wieviele Seats sucht der User
  searchStorage = 0; //wieviel Storage sucht der User

  constructor() { }
}
