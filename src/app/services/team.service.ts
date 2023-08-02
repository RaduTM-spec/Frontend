import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';
import { TeamDetails } from '../models/team-details';
import { TeamGradeDTO } from '../models/team-grade-dto';
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private URL_PATH = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

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

  removeMemberFromTeam(teamLeaderName: string, removedMemberName: string, teamName: string){
    const REMOVE_MEMBER_URL = `${this.URL_PATH}/remove-member?teamLeaderName=${teamLeaderName}&removedMemberName=${removedMemberName}&teamName=${teamName}`;
    return this.http.delete<boolean>(REMOVE_MEMBER_URL).subscribe({
      next: data => {
        window.location.reload();
        console.log(' > Member deleted');
        this.notificationService.showDefaultNotification(`Member ${removedMemberName} deleted successfully`)
      },
      error: error => {
        console.error('Error deleting member:', error);
      }
    });
  }
}
