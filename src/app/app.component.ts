import {Component} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cargonaut';


  constructor(private router: Router) {
    if (this.router.url === '/profil') {
      this.router.navigate(['/profil'])
    }
    if (this.router.url === '/carList'){
      this.router.navigate(['/carList'])
    }
    if(this.router.url === '/createTours') {
      this.router.navigate(['/createTours'])
    }
  }

}
