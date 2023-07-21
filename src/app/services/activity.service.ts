import { Injectable } from '@angular/core';
import {Activity} from "../models/activity";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  protected activitiesList: Activity[] = [
    {
      id: 1,
      name: 'Activity1',
    },
    {
      id: 2,
      name: 'Activity2',
    },
    {
      id: 3,
      name: 'Activity3',

    },
    {
      id: 4,
      name: 'Activity4',
    },
    {
      id: 5,
      name: 'Activity5',
    },
    {
      id: 6,
      name: 'Activity6',
    },
    {
      id: 7,
      name: 'Activity7',
    }
  ];

  getAllActivities(): Activity[] {
    return this.activitiesList;
  }

  getActivityByName(name: string){
    for(var i = 0; i < this.activitiesList.length; i++){
      if(this.activitiesList[i].name == name){
        return this.activitiesList[i];
      }
    }
    return this.activitiesList[0];
    // return this.teamsList.find(team => team.name === name);
  }


}
