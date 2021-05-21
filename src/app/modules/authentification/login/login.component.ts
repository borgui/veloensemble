import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthentificationService } from 'src/app/shared/services/authentification/authentification.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorConstant } from 'src/app/shared/constants/error-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal,private authService: AuthentificationService, private router: Router) { }

  errors = []
  user: User = new User();


  ngOnInit() {
  }

  login() {
    this.authService.login(this.user).subscribe(response => {
      if(response == null){
        this.addError(ErrorConstant.BAD_LOGIN)
      } else {
        this.authService.setItem("token", response.token)
        this.authService.setItem("user", JSON.stringify(response.user))
        this.router.navigate(['/user'])
        this.activeModal.close();
      }
    })
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

}
