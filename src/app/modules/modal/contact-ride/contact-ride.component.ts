import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-ride',
  templateUrl: './contact-ride.component.html',
  styleUrls: ['./contact-ride.component.css']
})
export class ContactRideComponent implements OnInit {

  constructor(private modal: NgbActiveModal) { }

  @Input()
  recipient;

  @Input()
  currentUser;

  ngOnInit() {
  }

}
