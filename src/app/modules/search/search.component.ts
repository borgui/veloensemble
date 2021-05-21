
import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from 'src/app/shared/components/abstract-form/abstract-form.component';
import { MapsService } from '../maps/maps.service';
import { RideService } from 'src/app/shared/services/ride/ride.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends AbstractFormComponent implements OnInit {

  searchParams = new Object();
  rideResult;
  goHour = null;

  constructor(mapService:MapsService, private rideService: RideService) {
    super(mapService)
   }

  ngOnInit() {
    this.searchParams["returnTrip"] = 1;  }

  onSelectItem(item, name:string){
    this.searchParams[name] = item.item;
    this.searchRide();
  }

  searchRide(){
    if(this.searchParams['origin'] != null && this.searchParams['destination'] != null){
      this.searchParams['goHour'] = this.convertTime(this.goHour)
      this.rideService.searchRide(this.searchParams).subscribe(response => {
        this.rideResult = response;
      })
    }
  }

  convertTime(hour){
    if(hour != null){
      var hours = hour.split(":")[0];
      var minutes = hour.split(":")[1];
      return hours * 60 + parseInt(minutes);
    }
    return 0;
  }

}
