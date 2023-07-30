import { Injectable } from '@angular/core';
import {Team} from "../models/team";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TeamDetails} from "../models/team-details";
@Injectable({
  providedIn: 'root'
})
export class TeamService {
  protected teamsList: Team[] = [
    {
      id: 1,
      name: 'Team1',
      grade: 6,
      team_leader_name: 'John',
      activities: [1,2,3],
      members: [3, 5]
    },
    {
      id: 2,
      name: 'Team2',
      grade: 7,
      team_leader_name: 'Sam',
      activities: [1,4,5],
      members: [2, 4, 6]

    },
    {
      id: 3,
      name: 'Team3',
      grade: 2,
      team_leader_name: 'Anthony',
      activities: [2,4,6],
      members: [7, 8]

    },
    {
      id: 4,
      name: 'Team4',
      grade: 3,
      team_leader_name: 'Daniel',
      activities: [2,3],
      members: []
    },
    {
      id: 5,
      name: 'Team5',
      grade: 9,
      team_leader_name: 'Jane',
      activities: [1,4,5],
      members: []
    },
    {
      id: 6,
      name: 'Team6',
      grade: 10,
      team_leader_name: 'Mike',
      activities: [1,2],
      members: []
    },
    {
      id: 7,
      name: 'Team7',
      grade: 8,
      team_leader_name: 'Emily',
      activities: [1,7],
      members: []
    }
  ];

  getUserTeam(id: number){
    for(let i = 0; i < this.teamsList.length; i++){
      if(this.teamsList[i].members.includes(id))
        return this.teamsList[i];
    }
    return this.teamsList[0];
  }

  private URL_PATH = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getActivityTeams(userName: string, activityName: string): Observable<Team[]> {
    const ACTIVITY_TEAMS_URL = `${this.URL_PATH}/activity-teams?userName=${userName}&activityName=${activityName}`;
    return this.http.get<Team[]>(ACTIVITY_TEAMS_URL);
  }
  getTeamDetailsFromAnActivity(userName: string, activityName: string, teamName: string): Observable<TeamDetails> {
    const TEAM_DETAILS_URL = `${this.URL_PATH}/team-details?mentorUserName=${userName}&activityName=${activityName}&teamName=${teamName}`;
    return this.http.get<TeamDetails>(TEAM_DETAILS_URL);
  }
}
