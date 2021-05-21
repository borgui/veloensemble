import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-delete-ride',
  templateUrl: './confirmation-delete-ride.component.html',
  styleUrls: ['./confirmation-delete-ride.component.css']
})
export class ConfirmationDeleteRideComponent implements OnInit {

  constructor(private modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
