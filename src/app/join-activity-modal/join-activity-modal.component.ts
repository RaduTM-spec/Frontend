import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {UserTeamDTO} from "../models/user-team-dto";
import {UserService} from "../services/user.service";
import {ActivityService} from "../services/activity.service";

@Component({
  selector: 'app-join-activity-modal',
  templateUrl: './join-activity-modal.component.html',
  styleUrls: ['./join-activity-modal.component.css']
})
export class JoinActivityModalComponent {

  userName: string = '';
  activityName: string = "";
  isActive: boolean = false;

  loggedUser$: Observable<UserTeamDTO> | undefined;

  constructor(private http: HttpClient, private userService:UserService, private activityService: ActivityService) { }

  showJoinActivityModal() {
    this.isActive = true;
  }

  closeModal() {
    this.isActive = false;
  }

  joinActivity() {
    // Input validation here, again
    if (this.activityName.trim() === "") {
      // Handle invalid input, show error message, etc. etc.
      return;
    }

    this.loggedUser$ = this.userService.user;
    this.loggedUser$?.subscribe(value => {
      this.userName = value.user.name;
      // POST request to the backend API using the HttpClient
      this.activityService.joinActivity(this.userName, this.activityName);
    })
  }
}
