import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Assessment} from "../models/assessment";
import {User} from "../models/user";
import {TeamDetails} from "../models/team-details";

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  private URL_PATH: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getUserAssessments(userName: string): Observable<Assessment[]> {
    const ASSESSMENTS_URL = `${this.URL_PATH}/user-assessments?userName=${userName}`;
    return this.http.get<Assessment[]>(ASSESSMENTS_URL);
  }

  sendTeamAssessments(assessments: Assessment[], mentorUserName: string, activityName: string, teamName: string): Observable<TeamDetails> {
    const url = `${this.URL_PATH}/team-assessment`;
    const params = { mentorUserName, activityName, teamName };

    return this.http.post<TeamDetails>(url, assessments, { params }).pipe()
  }
}
