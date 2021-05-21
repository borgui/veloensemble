import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  constructor(private http: HttpClient){ 
    super(http)
  }

  getUserById(id:number): Observable<any>{
    return this.http.post<User>(this.API_URL + "user/id", {id})
  }

  getUsersByIds(ids:number[]): Observable<any>{
    return this.http.post<User>(this.API_URL + "user/ids", {ids})
  }


  update(user:User): Observable<any>{
      return this.http.post<User>(this.API_URL + "user/update", {user})
  }
}
