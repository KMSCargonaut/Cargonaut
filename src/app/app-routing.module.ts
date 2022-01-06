import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilComponent} from "./components/profil/profil.component";
import {CarlistComponent} from "./components/carlist/carlist.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {TourSiteComponent} from "./components/tour-site/tour-site.component";
import {CreateToursComponent} from './components/create-tours/create-tours.component';
import {TourDetailsComponent} from "./components/tour-details/tour-details.component";
import {StrangerProfileComponent} from "./components/stranger-profile/stranger-profile.component";
import {TourEditComponent} from "./components/tour-edit/tour-edit.component";
import {TourListGenericComponent} from "./components/tour-list-generic/tour-list-generic.component";

const routes: Routes = [

  {
    path: 'profil',
    component: ProfilComponent
  },
  {
    path: 'carList',
    component: CarlistComponent
  },
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'tours/:startCity/:endCity/:date/:passengers/:storage',
    component: TourSiteComponent
  },
  {
    path: 'tours',
    component: TourSiteComponent
  },
  {
    path: 'createTours',
    component: CreateToursComponent
  },
  {
    path: 'tour-details/:did/:uid',
    component: TourDetailsComponent
  },
  {
    path: 'exprofile/:uid',
    component: StrangerProfileComponent,
  },
  {
    path: 'editTour/:did/:uid',
    component: TourEditComponent,
  }, {
    path: 'genericTable/:uid',
    component: TourListGenericComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
