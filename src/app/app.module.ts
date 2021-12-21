import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './comoponents/navbar/navbar.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {environment} from "../environments/environment";
import { RegistrationComponent } from './comoponents/registration/registration.component';
import {FormsModule} from "@angular/forms";
import { ProfilComponent } from './comoponents/profil/profil.component';
import { FooterComponent } from './comoponents/footer/footer.component';
import { NotloggedinComponent } from './comoponents/notloggedin/notloggedin.component';
import { LoggedinComponent } from './comoponents/loggedin/loggedin.component';
import { UpdateUserComponent } from './comoponents/loggedin/update-user/update-user.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppComponent,
    RegistrationComponent,
    ProfilComponent,
    FooterComponent,
    NotloggedinComponent,
    LoggedinComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    FormsModule,
    FontAwesomeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary){
    library.addIcons(fasStar, farStar);
  }
}
