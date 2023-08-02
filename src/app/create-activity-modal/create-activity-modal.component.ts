import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { ActivityService } from '../services/activity.service';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';
import { catchError, tap } from 'rxjs/operators';
import {ErrorHandlingService} from "../services/error-handling.service";

declare var $: any;

@Component({
  selector: 'app-create-activity-modal',
  templateUrl: './create-activity-modal.component.html',
  styleUrls: ['./create-activity-modal.component.css'],
})
export class CreateActivityModalComponent {
  newActivityName: string = '';
  endingDate: string = '';
  loggedUser: any;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private activityService: ActivityService,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlingService
  ) {}

  createActivity() {
    // Input validation here somewhere
    if (this.newActivityName.trim() === '' || this.endingDate.trim() === '') {
      return;
    }

    this.loggedUser = this.authService.loggedUser;

    this.activityService.createActivity(
        this.loggedUser.user.name,
        this.newActivityName,
        this.endingDate
      ).pipe(
        tap((response) => {
          window.location.reload();
          console.log('Activity created:', response);
          this.notificationService.showSuccessNotification('Activity joined successfully!');
          $('#assessmentModal').modal('hide');
        }),
        catchError((error) => {
          // Handle the error response
          console.error('Error creating activity:', error);
          this.errorHandler.handleBackendError(error)
          throw error;
        })
      )
      .subscribe();
  }
}
