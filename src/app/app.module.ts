import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { environment } from "../environments/environment";
import { SuchleisteComponent } from './components/main-page/suchleiste/suchleiste.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { InfoboxComponent } from './components/main-page/infobox/infobox.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfilComponent } from './components/profil/profil.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotloggedinComponent } from './components/profil/notloggedin/notloggedin.component';
import { LoggedinComponent } from './components/profil/loggedin/loggedin.component';
import { CarlistComponent } from './components/carlist/carlist.component';
import { CarItemComponent } from './components/carlist/car-item/car-item.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TourListComponent } from './components/tour-list/tour-list.component';
import { TourSiteComponent } from './components/tour-site/tour-site.component';

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
    CarlistComponent,
    CarItemComponent,
    InfoboxComponent,
    SuchleisteComponent,
    MainPageComponent,
    TourListComponent,
    TourSiteComponent
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
        ReactiveFormsModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
