import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { User } from 'src/app/shared/models/user';
import { AuthentificationService } from 'src/app/shared/services/authentification/authentification.service';
import { RideService } from 'src/app/shared/services/ride/ride.service';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService, private messageService: MessageService, private rideService: RideService) { }

  user: User;

  messages;

  respond = null;

  ngOnInit() {
    this.user = JSON.parse(this.authentificationService.getItem("user"));
    console.log(this.user)
    this.messageService.getByRecipientId(this.user._id).subscribe(response => {
      this.messages  = response;
    })
  }

  acceptUser(message){
    this.rideService.addCocycliste(message.senderId, message.rideId).subscribe(response => {
      this.respond = "accept"
      this.messageService.archive(message).subscribe()
    })
  }

  refuseUser(message){
    this.respond = "refuse"
    this.messageService.archive(message).subscribe()

  }

}
