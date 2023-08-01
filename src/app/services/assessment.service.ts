// assessment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment.prod";
import { TeamDetails } from "../models/team-details";
import { Assessment } from "../models/assessment";

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

  sendTeamAssessments(
    activityName: string,
    mentorUserName: string,
    teamName: string,
    newAssessments: Assessment[]
  ): Observable<TeamDetails> {
    const endpoint = `${this.apiUrl}/team-assessment?mentorUserName=${mentorUserName}&activityName=${activityName}&teamName=${teamName}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<TeamDetails>(endpoint, newAssessments, httpOptions);
  }
}
