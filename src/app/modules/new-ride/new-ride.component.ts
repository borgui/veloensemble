import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from 'src/app/shared/components/abstract-form/abstract-form.component';
import { MapsService } from '../maps/maps.service';
import { Ride } from 'src/app/shared/models/ride';
import { strictEqual } from 'assert';
import { AuthentificationService } from 'src/app/shared/services/authentification/authentification.service';
import { RideService } from 'src/app/shared/services/ride/ride.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-ride',
  templateUrl: './new-ride.component.html',
  styleUrls: ['./new-ride.component.css']
})
export class NewRideComponent extends AbstractFormComponent implements OnInit {

  constructor(mapService:MapsService, private authService: AuthentificationService, private rideService: RideService, private router: Router) { 
    super(mapService);
  }

  origin = "";
  destination = "";

  goHour;
  returnHour;

  selectedRoute;

  ride:any = new Object()

  ngOnInit() {
    this.ride.days = new Array<string>();
    this.ride.returnTrip = 1;
  }
  
  onChange(){
    console.log(this.origin);
  }

  addDayOfWeek(event:any, day:string){
    if(event.currentTarget.checked){
      if(!this.ride.days.includes(day)){
        this.ride.days.push(day)      
      }
    } else{
      if(!this.ride.days.includes(day)){
        this.ride.days = this.ride.days.filter(arrDay => arrDay != day)
      }
    }
  }

  onSelectedRoute(event){
    this.ride.route = event
    this.ride.origin = event.geometry.coordinates[0]
    this.ride.destination = event.geometry.coordinates[event.geometry.coordinates.length - 1]
  }

  send(){
    this.ride.userId = JSON.parse(this.authService.getItem("user"))._id
    this.ride.originName = this.origin["text_fr"]
    this.ride.destinationName = this.destination["text_fr"]
    this.ride.goHour = this.convertTime(this.goHour)
    this.ride.creationDate = new Date();
    if(this.returnHour != null){
      this.ride.returnHour = this.convertTime(this.returnHour)
    }

    this.rideService.newRide(this.ride).subscribe(ride => {
      this.router.navigate(["/ride", ride._id])
    })
  }

  convertTime(hour){
    var hours = hour.split(":")[0];
    var minutes = hour.split(":")[1];
    return hours * 60 + parseInt(minutes);
  }
}
