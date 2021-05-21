import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { User } from 'src/app/shared/models/user';
import { AuthentificationService } from 'src/app/shared/services/authentification/authentification.service';

@Component({
  selector: 'app-profil-update',
  templateUrl: './profil-update.component.html',
  styleUrls: ['./profil-update.component.css']
})
export class ProfilUpdateComponent implements OnInit {

  constructor(private userService: UserService, private authentificationService: AuthentificationService) { }

  user: any;
  updated = false
  ngOnInit() {
    let user = JSON.parse(this.authentificationService.getItem("user"));
    this.userService.getUserById(user._id).subscribe(response => {
      this.user = response;
    })
  }

  update(){
    this.userService.update(this.user).subscribe(response => {
      this.updated = true;
    })
  }
}
