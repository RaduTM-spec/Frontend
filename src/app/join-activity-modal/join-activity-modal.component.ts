import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from "../services/user.service";
import {ActivityService} from "../services/activity.service";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-join-activity-modal',
  templateUrl: './join-activity-modal.component.html',
  styleUrls: ['./join-activity-modal.component.css']
})
export class JoinActivityModalComponent {

  activityName: string = "";
  isActive: boolean = false;

  loggedUser: any;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private activityService: ActivityService,
    private authService: AuthenticationService
  ) {
  }

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
    this.loggedUser = this.authService.loggedUser
    // POST request to the backend API using the HttpClient
    this.activityService.joinActivity(this.loggedUser.user.name, this.activityName);
  }
}
