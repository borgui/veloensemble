import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapsComponent } from '../maps/maps.component';
import { MapsModalComponent } from '../maps/maps-modal/maps-modal.component';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { UserService } from 'src/app/shared/services/user/user.service';
import { User } from 'src/app/shared/models/user';
import { CommonFunction } from 'src/app/shared/common-function';
import { AuthentificationService } from 'src/app/shared/services/authentification/authentification.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrls: ['./ride-card.component.css']
})
export class RideCardComponent implements OnInit {

  constructor(private router:Router, private modalService: NgbModal, private userService: UserService, private authentificationService: AuthentificationService, private messageService: MessageService) { }

  @Input()
  ride:any
  
  @Input()
  type;

  @Output()
  removeRide = new EventEmitter<any>()

  user:User
  url: string;

  ngOnInit() {
    this.userService.getUserById(this.ride.userId).subscribe(user => {
      this.user = user
      this.url = CommonFunction.getProfilePic(this.user._id);
    })
  }

  openMaps(){
    
    let modalComponent = this.modalService.open(MapsModalComponent, { size: 'lg' })
    modalComponent.componentInstance.route = this.ride.route;
  }

  checkRideDay(day:string){
    if(this.ride.days.includes(day)){
      return true
    }

    return false;
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

  onRemoveClick(){
    this.removeRide.emit("");
  }

  openRideDetail(){
    this.router.navigate(["/ride", this.ride._id])
  }
}
