// assessment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assessment } from '../models/assessment';
import {environment} from "../../environments/environment.prod";
import {TeamDetails} from "../models/team-details";

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  private apiUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) {}

  getUserAssessments(userName: string): Observable<Assessment[]> {
      const endpoint = `${this.apiUrl}/user-assessments?userName=${userName}`;

      return this.http.get<Assessment[]>(endpoint);
  }

  // might not work with the request body but I wanted to see if it is automatically converted to query params
  sendTeamAssessments(
    activityName: string,
    mentorUserName: string,
    teamName: string,
    newAssessments: Assessment[]
  ): Observable<TeamDetails> {

    const endpoint = `${this.apiUrl}/team-assessment`;
    const requestBody = {
      activityName,
      mentorUserName,
      teamName,
      newAssessments,
    };

    return this.http.post<TeamDetails>(endpoint, requestBody);
  }



  // private URL_PATH: string = 'http://localhost:8080';
  //
  // constructor(private http: HttpClient) {}
  //
  // getUserAssessments(userName: string): Observable<Assessment[]> {
  //   const ASSESSMENTS_URL = `${this.URL_PATH}/user-assessments?userName=${userName}`;
  //   return this.http.get<Assessment[]>(ASSESSMENTS_URL);
  // }
  //
  // sendTeamAssessments(assessments: Assessment[], mentorUserName: string, activityName: string, teamName: string): Observable<TeamDetails> {
  //   const url = `${this.URL_PATH}/team-assessment`;
  //   const params = { mentorUserName, activityName, teamName };
  //
  //   return this.http.post<TeamDetails>(url, assessments, { params }).pipe()
  // }

}


