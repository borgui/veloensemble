import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/shared/services/authentification/authentification.service';
import { User } from 'src/app/shared/models/user';
import { CommonFunction } from 'src/app/shared/common-function';

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.css']
})
export class UserSpaceComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService) { }

  url;
  user: User;

  ngOnInit() {
    this.user = JSON.parse(this.authentificationService.getItem("user"));
    this.url = CommonFunction.getProfilePic(this.user._id);
  }

}
