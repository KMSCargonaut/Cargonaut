import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor() { }

  arrivalTime(startTime : string, duration: string, date: string) : string {
    let endTime = '';
    if (startTime.trim().length > 0 && duration.trim().length > 0 && date.trim().length > 0) {
      let hours: number = Number.parseInt(startTime.substr(0, 2)); //20
      let tempDuration: number = Number.parseInt(duration); //3
      let endHours = hours + tempDuration; //23
      let endDay: string = date.substr(8, 2); //
      let month: string = date.substr(5, 2);
      let currentMonth: string = "";

      console.log(month);
      console.log(month + 1);
      console.log(date.substr(0, 4));
      let monthsWith30Days: string [] = ["04", "06", "09", "11"];
      let monthWith31Days: string [] = ["01", "03", "05", "07", "08", "10", "12"];

      console.log(endDay);

      if (endHours >= 24) {

        switch (endDay) {
          case "28" :
            break
          case "30" :

            break
          case "31" :
            monthWith31Days.forEach((mnth: string) => {
              if (mnth === month) {
                if (Number.parseInt(month) < 10) {
                    month =  "0" + (month.substring(2, 1) + 1)
                }
                  //month =  (Number.parseInt(month) + 1).toString();
              }
            });


            endDay =  (Number.parseInt(endDay) - 31).toString()
            endDay = (Number.parseInt(endDay) + 1).toString()
            if (endDay.trim().length < 2) { //Falls Datum in einer der ersten 9 Tage im Monat ist
              endDay = "0" + endDay;
            }
            endHours = endHours % 24;
            break;

          default:
            endDay = (Number.parseInt(endDay) + 1).toString()
            if (endDay.trim().length < 2) { //Falls Datum in einer der ersten 9 Tage im Monat ist
              endDay = "0" + endDay;
            }
            endHours = endHours % 24;
            break;
        }
    }

      if (endHours < 10) {
        endTime = date.substr(0, 8) + endDay + "T0" + endHours.toString();
      } else {
        endTime = date.substr(0, 4) + "-" + month + "-" +  endDay + "T" + endHours.toString();
        console.log(endTime);
      }

      endTime += startTime.substr(2, 3);
      console.log(startTime.substr(2, 3));
    }
    console.log(endTime);
    return endTime;

  }
}
