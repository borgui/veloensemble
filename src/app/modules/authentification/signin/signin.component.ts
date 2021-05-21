import { Component, OnInit, OnChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/user';
import { useAnimation } from '@angular/animations';
import { ErrorConstant } from 'src/app/shared/constants/error-constant';
import { AuthentificationService } from 'src/app/shared/services/authentification/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnChanges {

  constructor(private activeModal: NgbActiveModal,
     private authService: AuthentificationService,
     private router: Router) { }

  errors = [];

  user: User = new User();
  passwordConfirmation:string = "";

  ngOnInit() {
  }

  onPasswordChange(){
    if(this.passwordConfirmation != this.user.password){
      this.addError(ErrorConstant.BAD_CONFIRMATION_PASSWORD)
    } else {
      this.removeError(ErrorConstant.BAD_CONFIRMATION_PASSWORD);
    }
  }

  signin(){
    if(this.errors.length == 0){
      this.authService.signin(this.user).subscribe(response => {
        let user = JSON.stringify(response.user)
        this.authService.setItem("token", response.token)
        this.authService.setItem("user", user)
        this.router.navigate(['/user'])
        this.activeModal.close();
      })
    }
  }

  addError(error:string){
    if(!this.errors.includes(error)){
      this.errors.push(error);
    }
  }

  removeError(error:string){
    let index = this.errors.indexOf(error);
    if(index > -1){
      this.errors.splice(index, 1);
    }

  }
  ngOnChanges(){
    this.errors = [];
    console.log(this.errors)

  }

}
