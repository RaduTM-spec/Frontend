import { Injectable } from '@angular/core';
import {Team} from "../models/team";
@Injectable({
  providedIn: 'root'
})
export class TeamService {
  protected teamsList: Team[] = [
    {
      id: 0,
      name: 'Team 1',
      grade: 6
    },
    {
      id: 1,
      name: 'Team 2',
      grade: 7
    },
    {
      id: 2,
      name: 'Team 3',
      grade: 2
    },
    {
      id: 3,
      name: 'Team 4',
      grade: 3
    },
    {
      id: 4,
      name: 'Team 5',
      grade: 9
    },
    {
      id: 5,
      name: 'Team 6',
      grade: 10
    },
    {
      id: 6,
      name: 'Team 7',
      grade: 8
    }
  ];

  getAllTeams(): Team[] {
    return this.teamsList;
  }

  getTeam(id: number): Team | undefined {
    return this.teamsList.find(team => team.id === id);
  }

}
