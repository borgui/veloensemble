import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService extends ApiService {

  protected collection = "ride"


  constructor(private http: HttpClient) { 
    super(http)
  }

  newRide(ride:any): Observable<any>{
    return this.http.post<any>(this.API_URL + this.collection + "/new", {ride})
  }

  getRide(id:number): Observable<any>{
    return this.http.post<any>(this.API_URL + this.collection + "/getById", {id})
  }
  getRideByUser(userId:number): Observable<any>{
    return this.http.post<any>(this.API_URL + this.collection + "/userId", {userId})
  }
  getArchivedRideByUser(userId:number): Observable<any>{
    return this.http.post<any>(this.API_URL + this.collection + "/archivedRide/userId", {userId})
  }
  getRideByCocycliste(userId:number): Observable<any>{
    return this.http.post<any>(this.API_URL + this.collection + "/cocycliste/userId", {userId})
  }
  searchRide(searchParams:any): Observable<any>{
    return this.http.post<any>(this.API_URL + this.collection + "/search", {searchParams})
  }

  archive(ride:any): Observable<any>{
    return this.http.post<any>(this.API_URL + this.collection + "/archive", {ride})
  }

  addCocycliste(id:any, rideId): Observable<any>{
    return this.http.post<any>(this.API_URL + this.collection + "/addCocycliste", {id, rideId})
  }}
