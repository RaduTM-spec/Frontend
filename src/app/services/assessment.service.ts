import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Assessment} from "../models/assessment";

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  private URL_PATH = '';

  constructor(private http: HttpClient) {}

  getUserAssessments(userName: string): Observable<Assessment[]> {
    const ASSESSMENTS_URL = `${this.URL_PATH}/user-assessments?userName=${userName}`;
    return this.http.get<Assessment[]>(ASSESSMENTS_URL);
  }
}
