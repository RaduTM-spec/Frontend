import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.prod";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { UserTeamDTO } from "../models/user-team-dto";
import { tap } from "rxjs/operators";
import { NotificationService } from "./notification.service";
import {ErrorHandlingService} from "./error-handling.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = false;
  private apiUrl = environment.apiServerUrl;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private errorHandlingService: ErrorHandlingService,
  ) {}

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  private _loggedUser: any;

  get loggedUser(): any {
    return this._loggedUser;
  }

  set loggedUser(value: any) {
    this._loggedUser = value;
  }

  authenticateUser(name: string): Observable<UserTeamDTO> {
    const USER_TEAM_URL = `${this.apiUrl}/authenticate?name=${name}`;
    return this.http.post<UserTeamDTO>(USER_TEAM_URL, {title: `${name} logged in`}).pipe(
      tap((loggedUser: UserTeamDTO) => {
        console.log(' > Received logged user:', loggedUser);
        this.notificationService.showSuccessNotification("Login Successful!")
        this.loggedIn = true;

      }),
      catchError((error) => {
        this.errorHandlingService.handleBackendError(error);
        console.error('Error fetching logged user:', error);
        return [];
      })
    );
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  loginNewMentor(username: string, create: any, activityName: any, dueDate: any): Observable<UserTeamDTO> {
    const endpoint = `${this.apiUrl}/new/mentor?userName=${username}&create=${create}&activityName=${activityName}&dueDate=${dueDate}`;
    const body = { name: username };

    return this.http.post<UserTeamDTO>(endpoint, body).pipe(
      tap((newMentor: UserTeamDTO) => {
        // Handle successful response
        console.log(' > Received new MENTOR:', newMentor);
        this.notificationService.showSuccessNotification(`Mentor ${username} created successfully!`)
        this.loggedIn = true;
      }),
      catchError((error) => {
        this.errorHandlingService.handleBackendError(error);
        console.error('Error creating new MENTOR:', error);
        return [];
      })
    );
  }

  loginNewLead(username: string, teamName: any): Observable<UserTeamDTO> {
    const endpoint = `${this.apiUrl}/new/lead?userName=${username}&teamName=${teamName}`;
    const body = { name: username };

    return this.http.post<UserTeamDTO>(endpoint, body).pipe(
      tap((teamLeader: UserTeamDTO) => {
        // Handle successful response
        console.log(' > Received new TEAM_LEADER:', teamLeader);
        this.notificationService.showSuccessNotification(`Team leader ${username} created successfully!`)
        this.loggedIn = true;
      }),
      catchError((error) => {
        this.errorHandlingService.handleBackendError(error);
        console.error('Error creating new TEAM_LEADER:', error);
        return [];
      })
    );
  }

  loginNewMember(username: string, teamName: any): Observable<UserTeamDTO> {
    const endpoint = `${this.apiUrl}/new/member?username=${username}&teamName=${teamName}`;
    const body = { name: username };

    return this.http.post<UserTeamDTO>(endpoint, body).pipe(
      tap((newMember: UserTeamDTO) => {
        // Handle successful response
        console.log(' > Received new MEMBER:', newMember);
        this.notificationService.showSuccessNotification(`Member ${username} created successfully!`)
        this.loggedIn = true;
      }),
      catchError((error) => {
        this.errorHandlingService.handleBackendError(error);
        console.error(`Error creating new MEMBER ${username}:`, error);
        return [];
      })
    );
  }

  temporaryLogin() {
    this.loggedIn = true;
  }

  logout(): void {
    // we will need to clear the logged in user from the user service and etc
    this.loggedIn = false;
    this.notificationService.showDefaultNotification("Logged out successfully")
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.loggedIn = false;
    this.errorHandlingService.handleBackendError(error);
    console.error('error');
    return throwError(error);
  }
}
