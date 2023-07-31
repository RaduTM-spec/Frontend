import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {TeamService} from "../services/team.service";
import {Team} from "../models/team";
import {ActivatedRoute} from "@angular/router";
import {Assessment} from "../models/assessment";
import {AssessmentService} from "../services/assessment.service";
import {catchError, Observable, tap} from "rxjs";
import {ErrorHandlingService} from "../services/error-handling.service";
import {NotificationService} from "../services/notification.service";
import {AppState} from "../enums/app-state.enum";

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent implements OnInit {
  loggedUser: User | undefined;
  loggedUserTeam: Team | undefined;
  userAssessments$: Observable<Assessment[]> | undefined;
  appState: AppState = AppState.LOADING;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private teamService: TeamService,
    private assessmentService: AssessmentService,
    private errorHandler: ErrorHandlingService,
    private notifierService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser();

    if (this.loggedUser.role != "mentor") {

      // this.appState = AppState.ERROR

      this.userAssessments$ = this.assessmentService.getUserAssessments(this.loggedUser.name)
        .pipe(
          tap((assessments: Assessment[]) => {
            console.log(' > Received user assessments:', assessments);
            this.appState = assessments.length > 0 ? AppState.LOADED : AppState.EMPTY;
          }),
          catchError((error) => {
            console.log('Error fetching user assessments:', error);
            this.errorHandler.handleBackendError(error);
            this.appState = AppState.EMPTY;
            return [];
          })
        );
    } else {
      this.appState = AppState.LOADED; // If the user is a mentor, we set app state to loaded
    }
  }




  // Method to show a manual snackbar
  showManualError(): void {
    console.log("in show manual error")
    // this.errorHandler.handleBackendError({ error: { message: 'This is an example error message.' } });
    this.notifierService.showDefaultNotification( "Fuck TypeScript!")

  }


  protected readonly AppState = AppState;
}
