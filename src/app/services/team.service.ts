import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamDetails } from '../models/team-details';
import { TeamGradeDTO } from '../models/team-grade-dto';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private URL_PATH = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getActivityTeamsAndGrades(userName: string, activityName: string): Observable<TeamGradeDTO[]> {
    const ACTIVITY_TEAMS_URL = `${this.URL_PATH}/activity-teams?mentorName=${userName}&activityName=${activityName}`;
    return this.http.get<TeamGradeDTO[]>(ACTIVITY_TEAMS_URL);
  }

  getTeamDetailsFromAnActivity(
    userName: string,
    activityName: string,
    teamName: string
  ): Observable<TeamDetails> {
    const TEAM_DETAILS_URL = `${this.URL_PATH}/team-details?mentorUserName=${userName}&activityName=${activityName}&teamName=${teamName}`;
    return this.http.get<TeamDetails>(TEAM_DETAILS_URL);
  }
}
