import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {TeamService} from "../services/team.service";
import {Team} from "../models/team";

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent {

  user: User | undefined;
  team: Team | undefined;

  constructor(private userService:UserService, private teamService: TeamService) {

    this.user = userService.getLoggedUser();
    if(this.user.role != 'mentor')
      this.team = teamService.getUserTeam(this.user.id);
  }

  getUserProfilePicture() {

  }
}
