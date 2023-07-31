import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationService } from "./notification.service";
import { NotificationType } from "../enums/notification-type.enum";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  constructor(private notificationService: NotificationService) { }

  handleBackendError(error: any): void {
    if (error?.error?.message) {
      this.showNotification(error.error.message);
    } else {
      this.showNotification('An unknown error occurred. Please try again later.');
    }
  }

  public showNotification(message: string): void {
    this.notificationService.notify(NotificationType.SUCCESS, message);
  }
}
