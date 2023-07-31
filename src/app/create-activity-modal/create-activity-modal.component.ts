import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Activity} from "../models/activity";
import {catchError, Observable, tap} from "rxjs";
import {UserTeamDTO} from "../models/user-team-dto";
import {UserService} from "../services/user.service";
import {ActivityService} from "../services/activity.service";

@Component({
  selector: 'app-create-activity-modal',
  templateUrl: './create-activity-modal.component.html',
  styleUrls: ['./create-activity-modal.component.css']
})
export class CreateActivityModalComponent {
  userName: string = '';
  newActivityName: string = "";
  endingDate: string = "";

  loggedUser$: Observable<UserTeamDTO> | undefined;


  constructor(private http: HttpClient, private userService:UserService, private activityService: ActivityService) { }

  createActivity() {
    // Input validation here somewhere
    if (this.newActivityName.trim() === "" || this.endingDate.trim() === "") {
      return;
    }

    this.loggedUser$ = this.userService.user;
    this.loggedUser$?.subscribe(value => {
      this.userName = value.user.name;
      // POST request to the backend API using the HttpClient
      this.activityService.createActivity(this.userName, this.newActivityName, this.endingDate);
    })



  }
}
