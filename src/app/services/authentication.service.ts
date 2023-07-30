import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {UserTeamDTO} from "../models/user-team-dto";

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


  login(username: string): Observable<UserTeamDTO> {
    const endpoint = `${this.apiUrl}/authenticate`;
    const body = { name: username };

    this.loggedIn = true;

    return this.http.post(endpoint, body).pipe(
      map((response: any) => {
        this.loggedIn = true;
        return response;
      }),
      catchError((error) => {
        this.loggedIn = false;
        return throwError(error);
      })
    );
  }

  logout(): void {
    // we will need to clear the logged in user from the user service and etc
    this.loggedIn = false;
  }
}
