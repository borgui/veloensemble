import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from '../authentification/signin/signin.component';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { MapsService } from '../maps/maps.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private modalService: NgbModal, private mapService: MapsService) { }

  searching;
  ngOnInit() {
  }

  formatter = (x: {place_name: string}) => x.place_name;

  
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.mapService.searchAdress(term).pipe(
          tap(() => {}),
          catchError(() => {
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

}
