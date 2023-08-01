import { Injectable } from '@angular/core';
import {Activity} from "../models/activity";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private URL_PATH = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getActivities(userName: string): Observable<Activity[]> {
    const ACTIVITIES_URL = `${this.URL_PATH}/activities?userName=${userName}`;
    return this.http.get<Activity[]>(ACTIVITIES_URL);
  }

  createActivity(userName: string, activityName: string, deadline: string){
    console.log(userName, activityName, deadline)
    this.http.post(`${this.URL_PATH}/activities?userName=${userName}&activityName=${activityName}&deadline=${deadline}` ,{title: 'Activity created!'}).subscribe(
      (response)=> {
        // Handle the response from the backend
        console.log('Activity created:', response);
      },
      catchError((error) => {
        console.error('Error creating activity:', error);
        return [];
      })
    );
  }
  joinActivity(userName: string, activityName: string){
    this.http.put(`${this.URL_PATH}/join-activity?userName=${userName}&activityName=${activityName}` ,{title: 'Joined activity!'}).subscribe(
      (response)=> {
        // Handle the response from the backend
        console.log('Joined activity:', response);
      },
      catchError((error) => {
        console.error('Error joining activity:', error);
        return [];
      })
    );
  }
}
