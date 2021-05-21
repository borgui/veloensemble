import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthentificationService } from './shared/services/authentification/authentification.service';
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators'
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Interceptor implements HttpInterceptor{

    constructor(private authService: AuthentificationService, private router: Router){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.getItem("token")}`
          }
        });
        return next.handle(request).pipe(
            catchError(error => {
                if(error.status == "401"){
                    this.router.navigate(['/'])
                }
                return of(error);
            })
        )
      }
}