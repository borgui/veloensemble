import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends ApiService {

  protected collection = "message"
  constructor(private http: HttpClient) { 
    super(http)
  }

  getByRecipientId(id:number){
    return this.http.post<any>(this.API_URL + this.collection + "/recipientId", {id})
  }

  send(message:any){
    return this.http.post<any>(this.API_URL + this.collection + "/send", {message})
  }

  archive(message:any){
    return this.http.post<any>(this.API_URL + this.collection + "/archive", {message})
  }
}