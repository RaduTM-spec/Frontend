import {Component, inject} from '@angular/core';
import {User} from "../../models/user";
import {TeamService} from "../../services/team.service";
import {ActivatedRoute} from "@angular/router";
import {Team} from "../../models/team";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-mentor-view-team',
  templateUrl: './mentor-view-team.component.html',
  styleUrls: ['./mentor-view-team.component.css']
})
export class MentorViewTeamComponent{

  route: ActivatedRoute = inject(ActivatedRoute);
  teamsService: TeamService = inject(TeamService);
  team: Team | undefined;
  teamGrade: number = 0;

  usersService: UserService = inject(UserService);
  usersList: User[] = [];

  constructor() {
    const teamName:string = this.route.snapshot.params['name'];
    this.team = this.teamsService.getTeamByName(teamName);
    this.teamGrade = this.teamsService.getTeamGrade(this.team.id);
    this.usersList = this.usersService.getAllUsers();
  }

  teamName: string = "X";

  members:User[] = this.usersList.filter((user) => { return user.team !== this.team?.id;});

  exportSituation() {


  }

}
