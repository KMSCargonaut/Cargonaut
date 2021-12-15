import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Alert} from "../../models/Alert";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent {

  constructor(public alert: AlertService) { }

  public close(alert: Alert): void {
    this.alert.alerts.splice(this.alert.alerts.indexOf(alert), 1);
  }

}
