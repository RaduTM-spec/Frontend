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
      activities: [1,2,3],
      members: [1, 3, 5]
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

  getAllTeams(): Team[] {
    return this.teamsList;
  }

  getTeamByName(name: string){
    for(let i = 0; i < this.teamsList.length; i++){
      if(this.teamsList[i].name == name){
          return this.teamsList[i];
      }
    }
    return this.teamsList[0];
    // return this.teamsList.find(team => team.name === name);
  }

  getTeamGrade(id: number){
    for(let i = 0; i < this.teamsList.length; i++){
      if(this.teamsList[i].id == id){
        return this.teamsList[i].grade;
      }
    }
    return 0;
  }

  getTeamById(id: number){
    for(let i = 0; i < this.teamsList.length; i++){
      if(this.teamsList[i].id == id){
        return this.teamsList[i];
      }
    }
    return this.teamsList[0];
    // return this.teamsList.find(team => team.name === name);
  }

  getUserTeam(id: number){
    for(let i = 0; i < this.teamsList.length; i++){
      if(this.teamsList[i].members.includes(id))
        return this.teamsList[i];
    }
    return this.teamsList[0];
  }


}
