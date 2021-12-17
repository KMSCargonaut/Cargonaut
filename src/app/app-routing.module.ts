import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilComponent} from "./components/profil/profil.component";
import {CarlistComponent} from "./components/carlist/carlist.component";
import {SuchleisteComponent} from "./components/main-page/suchleiste/suchleiste.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {TourSiteComponent} from "./components/tour-site/tour-site.component";

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
    path: 'tours',
    component: TourSiteComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
