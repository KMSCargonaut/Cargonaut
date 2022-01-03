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
import { CreateToursComponent } from './components/create-tours/create-tours.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { TourCardComponent } from './components/tour-card/tour-card.component';
import { SlideCheckerComponent } from './components/slide-checker/slide-checker.component';
import {TourDetailsComponent} from "./components/tour-details/tour-details.component";
import { StrangerProfileComponent } from './components/stranger-profile/stranger-profile.component';
import { UpdateUserComponent } from './components/profil/loggedin/update-user/update-user.component';
import {AddMoneyComponent} from "./components/add-money/add-money.component";
import {LoadMoneyButtonComponent} from "./components/add-money/load-money-button/load-money-button.component";
import { VoteStarsComponent } from './components/profil/vote-stars/vote-stars.component';
import { TourEditComponent } from './components/tour-edit/tour-edit.component';
import { ProfileTourListComponent } from './components/profil/loggedin/profile-tour-list/profile-tour-list.component';
import { TourBookComponent } from './components/tour-details/tour-book/tour-book.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { TourTableComponent } from './components/tour-table/tour-table.component';
import { TourListGenericComponent } from './components/tour-list-generic/tour-list-generic.component';
import { AddEvaluationComponent } from './components/add-evaluation/add-evaluation.component';

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
    TourSiteComponent,
    CreateToursComponent,
    AlertsComponent,
    TourCardComponent,
    SlideCheckerComponent,
    TourDetailsComponent,
    SlideCheckerComponent,
    StrangerProfileComponent,
    UpdateUserComponent,
    AddMoneyComponent,
    LoadMoneyButtonComponent,
    VoteStarsComponent,
    TourEditComponent,
    ProfileTourListComponent,
    TourBookComponent,
    EditAccountComponent,
    TourTableComponent,
    TourListGenericComponent,
    AddEvaluationComponent,
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
