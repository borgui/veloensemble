import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from '../authentification/signin/signin.component';
import { AuthentificationService } from 'src/app/shared/services/authentification/authentification.service';
import { LoginComponent } from '../authentification/login/login.component';
import { User } from 'src/app/shared/models/user';
import { CommonFunction } from 'src/app/shared/common-function';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private authentificationService: AuthentificationService) { }

  user:any;
  profileImgPath;

  ngOnInit() {
    this.user = JSON.parse(this.authentificationService.getItem("user"));
    if(this.user != null){
      this.profileImgPath = CommonFunction.getProfilePic(this.user.id)
    }
  }

  
  openSignWindow(){
    this.modalService.open(SigninComponent).result.then(result => {})
  }

  openLogin(){
    this.modalService.open(LoginComponent).result.then()
  }

  userConnected(){
    return this.user != null;
  }
}
