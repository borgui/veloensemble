import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AuthentificationService } from 'src/app/shared/services/authentification/authentification.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { RideService } from 'src/app/shared/services/ride/ride.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDeleteRideComponent } from '../modal/confirmation-delete-ride/confirmation-delete-ride.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private modalService: NgbModal, private rideService: RideService,private userService: UserService, private authentificationService: AuthentificationService, private messageService: MessageService) { }

  user: User = null;
  message: any = null;
  ride:any = null;
  removed = false;
  rideType = null;

  ngOnInit() {
    this.user = JSON.parse(this.authentificationService.getItem("user"));
    console.log(this.user)
    this.getUser(this.user._id);
    this.messageService.getByRecipientId(this.user._id).subscribe(response => {
      if(response != null && response.length > 0){
        this.message  = response[0];
      }
    })
    console.log(this.user._id)
    let getRideUser = this.rideService.getRideByUser(this.user._id)
    let getRideCocycliste = this.rideService.getRideByCocycliste(this.user._id)

    forkJoin([getRideUser, getRideCocycliste]).subscribe(results => {
      this.ride = results[0]
      console.log(results)
      this.rideType = "user"
      if(this.ride == null){
        this.ride = results[1]
        this.rideType = "cocycliste"
      }
    })
  }


  getUser(id:number){
    this.userService.getUserById(id).subscribe(response => {
      this.user = response;
      this.authentificationService.setItem("user", JSON.stringify({"_id":this.user._id, "firstname":this.user.firstname}))

    })
  }

  
  removeRide(){
    let modalComponent = this.modalService.open(ConfirmationDeleteRideComponent)
    modalComponent.result.then(result => {
      this.rideService.archive(this.ride).subscribe(response => {
        this.removed = true;
      })
    })
  }

}
