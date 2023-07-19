import { Injectable } from '@angular/core';
import {Team} from "../models/team";
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
      activity: 1
    },
    {
      id: 2,
      name: 'Team2',
      grade: 7,
      team_leader_name: 'Sam',
      activity: 1

    },
    {
      id: 3,
      name: 'Team3',
      grade: 2,
      team_leader_name: 'Anthony',
      activity: 1

    },
    {
      id: 4,
      name: 'Team4',
      grade: 3,
      team_leader_name: 'Daniel',
      activity: 2
    },
    {
      id: 5,
      name: 'Team5',
      grade: 9,
      team_leader_name: 'Jane',
      activity: 2
    },
    {
      id: 6,
      name: 'Team6',
      grade: 10,
      team_leader_name: 'Mike',
      activity: 3
    },
    {
      id: 7,
      name: 'Team7',
      grade: 8,
      team_leader_name: 'Emily',
      activity: 3
    }
  ];

  getAllTeams(): Team[] {
    return this.teamsList;
  }

  getTeamByName(name: string){
    for(var i = 0; i < this.teamsList.length; i++){
      if(this.teamsList[i].name == name){
          return this.teamsList[i];
      }
    }
    return this.teamsList[0];
    // return this.teamsList.find(team => team.name === name);
  }

  getTeamGrade(id: number){
    for(var i = 0; i < this.teamsList.length; i++){
      if(this.teamsList[i].id == id){
        return this.teamsList[i].grade;
      }
    }
    return 0;
  }

  getTeamById(id: number): Team | undefined {
    return this.teamsList.find(team => team.id === id);
  }

}
