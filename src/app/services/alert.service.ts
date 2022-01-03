import { Injectable } from '@angular/core';
import {Alert} from "../models/Alert";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alerts: Alert[] = [];

  constructor() { }

  public showAlert(alert: Alert): void {
    if(this.alerts.length > 0){
      this.alerts.pop();
    }
    this.alerts.push(alert);
    this.closeAlert(alert);
  }

  public closeAlert(alert: Alert): void {
    setTimeout(() => {
      if (this.alerts.includes(alert)) {
        this.alerts.splice(this.alerts.indexOf(alert),1);
      }
    }, 5000)
  }
}
