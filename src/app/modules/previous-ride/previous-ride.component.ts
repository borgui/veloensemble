import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/shared/services/authentification/authentification.service';
import { RideService } from 'src/app/shared/services/ride/ride.service';

@Component({
  selector: 'app-previous-ride',
  templateUrl: './previous-ride.component.html',
  styleUrls: ['./previous-ride.component.css']
})
export class PreviousRideComponent implements OnInit {

  archivedRides:any;

  constructor(private authentificationService: AuthentificationService, private rideService: RideService) { }

  ngOnInit() {
    let user = JSON.parse(this.authentificationService.getItem("user"));
      this.rideService.getArchivedRideByUser(user._id).subscribe(response => {
        this.archivedRides = response
      })


  }

}
