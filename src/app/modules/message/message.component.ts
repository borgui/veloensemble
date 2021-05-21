import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor() { }

  @Input()
  message:any;

  @Output()
  acceptUser = new EventEmitter();

  @Output()
  refuseUser = new EventEmitter();

  ngOnInit() {
  }

  onAcceptUser(){
    this.acceptUser.emit();
  }

  onRefuseUser(){
    this.refuseUser.emit();
  }



}
