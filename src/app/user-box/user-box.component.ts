import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {TeamService} from "../services/team.service";
import {Team} from "../models/team";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent implements OnInit{

  user: User | undefined;
  team: Team | undefined;

  constructor(private  activatedRoute: ActivatedRoute, private userService:UserService, private teamService: TeamService) {

    this.user = userService.getLoggedUser();
    // this.user = this.activatedRoute.snapshot.queryParamMap.get('user');
    if(this.user.role != 'mentor')
      this.team = teamService.getUserTeam(this.user.id);


  }

  ngOnInit(): void {
  }
  getUserProfilePicture() {

  }


}
