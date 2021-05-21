import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './modules/homepage/homepage.component';
import { UserSpaceComponent } from './modules/user-space/user-space.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SearchComponent } from './modules/search/search.component';
import { MapsComponent } from './modules/maps/maps.component';
import { ProfilUpdateComponent } from './modules/profil-update/profil-update.component';
import { UserMessagesComponent } from './modules/user-messages/user-messages.component';
import { PreviousRideComponent } from './modules/previous-ride/previous-ride.component';
import { StatisticsComponent } from './modules/statistics/statistics.component';
import { NewRideComponent } from './modules/new-ride/new-ride.component';
import { RideDetailComponent } from './modules/ride-detail/ride-detail.component';

const routes: Routes = [
  {path:'', component:HomepageComponent},
  {path:'search', component:SearchComponent},
  {path:'new', component: NewRideComponent},
  {path:'ride/:id', component: RideDetailComponent},
  {path:'user', component:UserSpaceComponent, children:[
    {path:'', redirectTo:'dashboard', pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent},
    {path:'profil', component:ProfilUpdateComponent},
    {path:'previous-ride', component:PreviousRideComponent},
    {path:'messages', component:UserMessagesComponent},
    {path:'statistics', component:StatisticsComponent}],



}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
