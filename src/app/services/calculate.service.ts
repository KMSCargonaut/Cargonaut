import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor() { }

  arrivalTime(startTime : string, duration: string, date: string) : string {
    let endTime = '';
    if (startTime.trim().length > 0 && duration.trim().length > 0 && date.trim().length > 0) {
      let hours: number = Number.parseInt(startTime.substr(0, 2));
      let tempDuration: number = Number.parseInt(duration);
      let endHours = hours + tempDuration;
      let endDay = date.substr(8, 2);

      if (endHours >= 24) {
        endDay = (Number.parseInt(endDay) + 1).toString()
        if (endDay.trim().length < 2) { //Falls Datum in einer der ersten 9 Tage im Monat ist
          endDay = "0" + endDay;
        }
        endHours = endHours % 24;
      }

      if (endHours < 10) {
        endTime = date.substr(0, 8) + endDay + "T0" + endHours.toString();
      } else {
        endTime = date.substr(0, 8) + endDay + "T" + endHours.toString();
      }
      endTime += startTime.substr(2, 3);
    }
    return endTime;
  }
}
