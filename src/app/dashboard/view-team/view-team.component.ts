import {Component} from '@angular/core';
import {User} from "../../models/user";
import {TeamService} from "../../services/team.service";
import {ActivatedRoute} from "@angular/router";
import {Team} from "../../models/team";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-mentor-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent{

  loggedUser: User;

  team: Team | undefined;
  teamGrade: number = 0;

  usersList: User[] = [];
  members: User[] = [];
  constructor(private activatedRoute: ActivatedRoute, private teamsService: TeamService, private usersService: UserService) {
    const teamName:string = this.activatedRoute.snapshot.queryParams['teamName'];
    this.team = this.teamsService.getTeamByName(teamName);

    // const userName:string = this.activatedRoute.snapshot.queryParams['userName'];
    this.loggedUser = this.usersService.getLoggedUser();

    this.teamGrade = this.teamsService.getTeamGrade(this.team.id);
    this.usersList = this.usersService.getAllUsers();
    this.members = this.usersList.filter((user) => { return this.team?.members.includes(user.id);});
  }




  exportSituation() {


  }

}
