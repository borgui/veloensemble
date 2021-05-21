import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './modules/homepage/homepage.component';
import { HeaderComponent } from './modules/header/header.component';
import { SigninComponent } from './modules/authentification/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { UserSpaceComponent } from './modules/user-space/user-space.component';
import { LoginComponent } from './modules/authentification/login/login.component';
import { Interceptor } from './app.interceptor';
import { SearchComponent } from './modules/search/search.component';
import {MatButtonModule, MatCheckboxModule, MatRadioButton, MatRadioGroup, MatRadioModule} from '@angular/material';
import { RideCardComponent } from './modules/ride-card/ride-card.component';
import { MapsComponent } from './modules/maps/maps.component';
import { MapsModalComponent } from './modules/maps/maps-modal/maps-modal.component';
import { ProfilUpdateComponent } from './modules/profil-update/profil-update.component';
import { PreviousRideComponent } from './modules/previous-ride/previous-ride.component';
import { UserMessagesComponent } from './modules/user-messages/user-messages.component';
import { StatisticsComponent } from './modules/statistics/statistics.component';
import { NewRideComponent } from './modules/new-ride/new-ride.component';
import { AbstractFormComponent } from './shared/components/abstract-form/abstract-form.component';
import { RideDetailComponent } from './modules/ride-detail/ride-detail.component';
import { MessageComponent } from './modules/message/message.component';
import { ConfirmationDeleteRideComponent } from './modules/modal/confirmation-delete-ride/confirmation-delete-ride.component';
import { ContactRideComponent } from './modules/modal/contact-ride/contact-ride.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    SigninComponent,
    DashboardComponent,
    UserSpaceComponent,
    LoginComponent,
    SearchComponent,
    RideCardComponent,
    MapsComponent,
    MapsModalComponent,
    ProfilUpdateComponent,
    PreviousRideComponent,
    UserMessagesComponent,
    StatisticsComponent,
    NewRideComponent,
    AbstractFormComponent,
    RideDetailComponent,
    MessageComponent,
    ConfirmationDeleteRideComponent,
    ContactRideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MatRadioModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  entryComponents:[
    SigninComponent,
    LoginComponent,
    MapsModalComponent,
    ConfirmationDeleteRideComponent,
    ContactRideComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
