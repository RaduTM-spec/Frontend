import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../services/team.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {catchError, Observable, tap} from "rxjs";
import {TeamDetails} from "../../models/team-details";
import {UserTeamDTO} from "../../models/user-team-dto";

@Component({
  selector: 'app-mentor-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit{


  teamDetails$: Observable<TeamDetails> | undefined;
  loggedUser$: Observable<UserTeamDTO> | undefined;

  teamName:string = '';
  activityName:string = '';
  constructor(private activatedRoute: ActivatedRoute, private teamService: TeamService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.activityName = params.get('activityName') || '';
      this.teamName = params.get('teamName') || '';
    })

    this.loggedUser$ = this.userService.user;

    this.loggedUser$?.subscribe(loggedUser => {
      this.teamDetails$ = this.teamService.getTeamDetailsFromAnActivity(loggedUser.user.name, this.activityName, this.teamName)
        .pipe(
          tap((teamDetail: TeamDetails) => {
            console.log(' > Received team details:', teamDetail);
          }),
          catchError((error) => {
            console.error('Error fetching team details:', error);
            return [];
          })
        );
    })
  }

  exportSituation() {
  }

}
