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
    private errorHandlingService: ErrorHandlingService
  ) {}

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  loginExistingUser(username: string): Observable<UserTeamDTO> {
    const endpoint = `${this.apiUrl}/authenticate`;
    const body = { name: username };

    this.loggedIn = true;

    return this.http.post<UserTeamDTO>(endpoint, body).pipe(
      tap((response: UserTeamDTO) => {
        // Handle successful response
        this.loggedIn = true;
        this.notificationService.showSuccessNotification("Login Successful!");
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  loginNewMentor(username: string, create: any, activityName: any, dueDate: any): Observable<UserTeamDTO> {
    const endpoint = `${this.apiUrl}/new/mentor`;
    const body = { name: username };

    this.loggedIn = true;

    return this.http.post<UserTeamDTO>(endpoint, body).pipe(
      tap((response: UserTeamDTO) => {
        // Handle successful response
        this.loggedIn = true;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  loginNewLead(username: string, teamName: any): Observable<UserTeamDTO> {
    const endpoint = `${this.apiUrl}/new/lead`;
    const body = { name: username };

    this.loggedIn = true;

    return this.http.post<UserTeamDTO>(endpoint, body).pipe(
      tap((response: UserTeamDTO) => {
        // Handle successful response
        this.loggedIn = true;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  loginNewMember(username: string, teamName: any): Observable<UserTeamDTO> {
    const endpoint = `${this.apiUrl}/new/member`;
    const body = { name: username };

    this.loggedIn = true;

    return this.http.post<UserTeamDTO>(endpoint, body).pipe(
      tap((response: UserTeamDTO) => {
        // Handle successful response
        this.loggedIn = true;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
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
    return throwError(error);
  }
}
