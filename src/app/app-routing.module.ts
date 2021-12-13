import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilComponent} from "./components/profil/profil.component";
import {CarlistComponent} from "./components/carlist/carlist.component";

const routes: Routes = [

  {
    path: 'profil',
    component: ProfilComponent
  },
  {
    path: 'carList',
    component: CarlistComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
