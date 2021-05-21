import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user/user.service';
import { RideService } from 'src/app/shared/services/ride/ride.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapsModalComponent } from '../maps/maps-modal/maps-modal.component';
import { CommonFunction } from 'src/app/shared/common-function';
import { AuthentificationService } from 'src/app/shared/services/authentification/authentification.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { ContactRideComponent } from '../modal/contact-ride/contact-ride.component';

@Component({
  selector: 'app-ride-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.css']
})
export class RideDetailComponent implements OnInit {

  constructor(private messageService: MessageService, private authentificationService: AuthentificationService, private rideService: RideService, private modalService: NgbModal, private route: ActivatedRoute, private userService: UserService ) { }

  ride;
  owner;
  ownerImg;
  currentUser;
  cocyclistes;
  messageSent = false


  checkRideDay(day:string){
    if(this.ride.days.includes(day)){
      return true
    }

    return false;
  }

  getOwner(id:number){
    this.userService.getUserById(id).subscribe(response => {
      this.owner = response;
      this.ownerImg = CommonFunction.getProfilePic(this.owner._id)
    })
  }

  getProfilePic(id){
    return CommonFunction.getProfilePic(id);
  }
  getCocyclistes(){
    this.userService.getUsersByIds(this.ride.cocyclistes).subscribe(response => {
      this.cocyclistes = response
    })
  }

  getHour(goHour:any){
    let hour:number = Math.floor(goHour / 60);
    if(hour < 10){
      return "0" + hour
    }
    return hour
  }

  getMinutes(goHour:number){
    let minutes = goHour % 60;
    if(minutes < 10){
      return "0" + minutes
    }
    return minutes
  }

  sendMessage(){
    let message = new Object();
    message["senderId"] = this.currentUser._id
    message["recipientId"] = this.owner._id
    message["senderFirstname"] = this.currentUser.firstname
    message["type"] = 2;
    message["rideId"] = this.ride._id;
    this.messageService.send(message).subscribe(response => {
      this.messageSent = true;
    })
  }

  ngOnInit() {
    this.currentUser = JSON.parse(this.authentificationService.getItem("user"));
    this.route.params.subscribe(params => {
      console.log(params['id']) //log the value of id
      this.rideService.getRide(params['id']).subscribe(response => {
        this.ride = response;
        this.getOwner(this.ride.userId)
        if(this.ride.cocyclistes != null){
          this.getCocyclistes();
        }
        console.log(response);
      })
    });
  }

  openContact(){
    let modal = this.modalService.open(ContactRideComponent)
    modal.componentInstance.recipient = this.owner;
    modal.componentInstance.currentUser = this.currentUser;
  }

}
