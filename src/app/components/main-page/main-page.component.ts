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
    "Hier steht ein Beispieltext zum anlocken von neuen Nutzern durch unser Feature, dass es relativ günstig ist, mit uns zu fahren!",
    "Hier steht ein Beispieltext zum anlocken von neuen Nutzern durch unser Feature, dass es einfach und unkompliziert ist, mit uns zu fahren!",
    "Hier steht ein Beispieltext zum anlocken von neuen Nutzern durch unser Feature, dass es sorglos, durch Nutzerbewertung, ist, mit uns zu fahren!"
  ]

  imagePaths = [
    "../../assets/img/Icons/money_icon.png",
    "../../assets/img/Icons/transporter_icon.png",
    "../../assets/img/Icons/thumbs_icon.png"
  ]

  constructor() { }

}
