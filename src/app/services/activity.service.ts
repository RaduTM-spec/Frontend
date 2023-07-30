import { Injectable } from '@angular/core';
import {Activity} from "../models/activity";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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

}
