import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-maps-modal',
  templateUrl: './maps-modal.component.html',
  styleUrls: ['./maps-modal.component.css']
})
export class MapsModalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  @Input()
  route;

  ngOnInit() {
  }

}
