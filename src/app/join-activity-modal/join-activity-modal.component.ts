import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { ActivityService } from '../services/activity.service';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';
import { catchError, tap } from 'rxjs/operators';
import {ErrorHandlingService} from "../services/error-handling.service";

declare var $: any; // Declared the $ symbol from jQuery

@Component({
  selector: 'app-join-activity-modal',
  templateUrl: './join-activity-modal.component.html',
  styleUrls: ['./join-activity-modal.component.css'],
})
export class JoinActivityModalComponent {
  activityName: string = '';
  isActive: boolean = false;
  loggedUser: any;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private activityService: ActivityService,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlingService
  ) {}

  showJoinActivityModal() {
    this.isActive = true;
  }

  closeModal() {
    this.isActive = false;
  }

  joinActivity() {
    // Input validation here, again
    if (this.activityName.trim() === '') {
      // Handle invalid input, show error message, etc. etc.
      return;
    }
    this.loggedUser = this.authService.loggedUser;

    this.activityService
      .joinActivity(this.loggedUser.user.name, this.activityName)
      .pipe(
        tap((response) => {
          window.location.reload();
          console.log('Joined activity:', response);
          this.notificationService.showSuccessNotification('Activity joined successfully!');
          $('#assessmentModal').modal('hide');

        }),
        catchError((error) => {
          console.error('Error joining activity:', error);
          this.errorHandler.handleBackendError(error)
          throw error;
        })
      )
      .subscribe();
  }
}
