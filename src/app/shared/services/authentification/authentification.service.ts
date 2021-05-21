import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService extends ApiService {

  protected collection = "auth"
  constructor(private http: HttpClient) { 
    super(http)
  }

  signin(user:User): Observable<any>{
    return this.http.post<User>(this.API_URL + this.collection + "/signin", {user})
  }

  login(user:User): Observable<any>{
    return this.http.post<User>(this.API_URL + this.collection + "/login", {user})
  }

  getItem(item:string){
    return sessionStorage.getItem(item);
  }
  
  setItem(key, value){
    sessionStorage.setItem(key, value)
  }
}
