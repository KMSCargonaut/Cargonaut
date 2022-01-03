import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent{

  boxTitles = [
    "Lass dich fahren für weniger Geld",
    "Dein Transport: Einfach und unkompliziert",
    "Sorglos fahren, dank Nutzerbewertungen"
  ]

  infoTexts = [
    "Anstatt sich teure Tickets für Bus und Bahn zu besorgen, oder einen Lieferdienst zu bezahlen, lassen sie sich von anderen Nutzern für wenig Geld helfen!",
    "Mit uns können sie einfach durch angebotene Fahrten von weiteren Nutzern stöbern oder selbst eine Anfrage stellen und sich somit schnell und unkompliziert helfen lassen!",
    "Bewerten Sie andere Nutzer nach Abschluss einer Fahrt und sehen sie Bewertungen weiterer Nutzer ein und tragen sie so zu einem sicheren und verlässlichen Umgang unserer Möglichkeiten zu!"
  ]

  imagePaths = [
    "../../assets/img/Icons/money_icon.png", // TODO Serag - Entweder die svgs hier verlinken oder direkt verwenden
    "../../assets/img/Icons/transporter_icon.png",
    "../../assets/img/Icons/thumbs_icon.png"
  ]

  constructor() { }

}
