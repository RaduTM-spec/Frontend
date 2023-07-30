import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.prod";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { UserTeamDTO } from "../models/user-team-dto";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = false;
  private apiUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) {}

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
      }),
      catchError(this.handleError)
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
      catchError(this.handleError)
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
      catchError(this.handleError)
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
      catchError(this.handleError)
    );
  }

  temporaryLogin() {
    this.loggedIn = true;
  }

  logout(): void {
    // we will need to clear the logged in user from the user service and etc
    this.loggedIn = false;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error("An error occurred:", error);
    this.loggedIn = false;
    return throwError(error);
  }
}
