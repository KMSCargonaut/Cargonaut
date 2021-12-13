import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cargonaut';

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
}
