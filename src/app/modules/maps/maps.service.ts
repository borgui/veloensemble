import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class MapsService extends ApiService {

  token = "pk.eyJ1IjoiYm9yZ3VpIiwiYSI6ImNqdHBodnA0MjA0Z3c0ZXM3b2RldWtpdDEifQ.12vJL9ItSgdioEhoavh8JQ"
  constructor(private http: HttpClient) {super(http) }

  getRoute(origin:number[], destination:number[]):Observable<any>{
    return this.http.get(`https://api.mapbox.com/directions/v5/mapbox/cycling/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&alternatives=true&access_token=${this.token}`)
  }

  searchAdress(text){
    return this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?language=fr&country=fr&access_token=${this.token}`).pipe(
      map((response:any) => response.features)
    )
  }

  getParking(northEast:any, southWest): Observable<any>{
    return this.http.get(this.API_URL + `parking?ne=${northEast}&sw=${southWest}`);
  }
}
