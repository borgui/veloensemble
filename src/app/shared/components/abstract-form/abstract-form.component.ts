import { Component, OnInit } from '@angular/core';
import { MapsService } from 'src/app/modules/maps/maps.service';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-abstract-form',
  templateUrl: './abstract-form.component.html',
  styleUrls: ['./abstract-form.component.css']
})
export class AbstractFormComponent implements OnInit {

  constructor(private mapService: MapsService) { }


  ngOnInit() {
  }

  searching;
  searchResult;

  formatter = (x: {place_name: string}) => x.place_name;

  
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.mapService.searchAdress(term).pipe(
          tap((response) => {console.log(response)}),
          catchError(() => {
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )
}
