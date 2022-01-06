import { Injectable } from '@angular/core';
import {Tour} from "../models/Tour";

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  confirmTour: Tour | null = null;
  isUserDriver = false;

  constructor() { }
}
