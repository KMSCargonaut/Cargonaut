import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cargonaut';


  constructor(private router: Router) {
    if (this.router.url === '/login') {
      this.router.navigate(['/login'])
    } else if (this.router.url === '/profil') {
      this.router.navigate(['/profil'])
    }
  }

}
