import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from "../services/user.service";
import {ActivityService} from "../services/activity.service";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-create-activity-modal',
  templateUrl: './create-activity-modal.component.html',
  styleUrls: ['./create-activity-modal.component.css']
})
export class CreateActivityModalComponent {
  newActivityName: string = "";
  endingDate: string = "";

  loggedUser: any;


  constructor(private http: HttpClient,
              private userService: UserService,
              private activityService: ActivityService,
              private authService: AuthenticationService
  ) {}

  createActivity() {
    // Input validation here somewhere
    if (this.newActivityName.trim() === "" || this.endingDate.trim() === "") {
      return;
    }

    this.loggedUser = this.authService.loggedUser
    // POST request to the backend API using the HttpClient
    this.activityService.createActivity(this.loggedUser.user.name, this.newActivityName, this.endingDate);


  }
}
