import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { User } from "../models/user";
import { TeamService } from "../services/team.service";
import { Team } from "../models/team";
import { ActivatedRoute } from "@angular/router";
import { Assessment } from "../models/assessment";
import { AssessmentService} from "../services/assessment.service";
import { catchError, Observable, tap } from "rxjs";

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent implements OnInit {
  loggedUser: User | undefined;
  loggedUserTeam: Team | undefined;
  userAssessments$: Observable<Assessment[]> | undefined;
  appState: 'APP_LOADING' | 'APP_LOADED' | 'APP_ERROR' = 'APP_LOADING'; // Will change it to be a global enum

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private teamService: TeamService,
    private assessmentService: AssessmentService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser();

    if (this.loggedUser.role != "mentor") {

      // this.appState = 'APP_ERROR'

      this.loggedUserTeam = this.teamService.getUserTeam(this.loggedUser.id);
      this.userAssessments$ = this.assessmentService.getUserAssessments(this.loggedUser.name)
        .pipe(
          tap((assessments: Assessment[]) => {
            console.log(' > Received user assessments:', assessments);
            this.appState = assessments.length > 0 ? 'APP_LOADED' : 'APP_ERROR';
          }),
          catchError((error) => {
            console.log('Error fetching user assessments:', error);
            this.appState = 'APP_ERROR';
            return [];
          })
        );
    } else {
      this.appState = 'APP_LOADED'; // If the user is a mentor, we set app state to loaded
    }
  }
}
