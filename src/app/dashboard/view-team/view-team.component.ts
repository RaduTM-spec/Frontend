import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../services/team.service";
import {ActivatedRoute} from "@angular/router";
import {catchError, Observable, tap} from "rxjs";
import {TeamDetails} from "../../models/team-details";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-mentor-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit {


  teamDetails$: Observable<TeamDetails> | undefined;
  loggedUser: any;

  teamName: string = '';
  activityName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.activityName = params.get('activityName') || '';
      this.teamName = params.get('teamName') || '';
    })

    this.loggedUser = this.authService.loggedUser

    this.teamDetails$ = this.teamService.getTeamDetailsFromAnActivity(this.loggedUser.user.name, this.activityName, this.teamName)
      .pipe(
        tap((teamDetail: TeamDetails) => {
          console.log(' > Received team details:', teamDetail);
        }),
        catchError((error) => {
          console.error('Error fetching team details:', error);
          return [];
        })
      );

  }

  exportSituation() {
  }

}
