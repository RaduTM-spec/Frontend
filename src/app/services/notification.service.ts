import { Injectable } from '@angular/core';
import {NotificationType} from "../enums/notification-type.enum";
import {NotifierService} from "angular-notifier";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private notifier: NotifierService) { }

  public showSuccessNotification(message: string): void {
    this.notify(NotificationType.SUCCESS, message);
  }

  public showDefaultNotification(message: string): void {
    this.notify(NotificationType.DEFAULT, message);
  }

  public showErrorNotification(message: string): void {
    this.notify(NotificationType.ERROR, message);
  }

  private notify(type: NotificationType, message: string): void {
    this.notifier.notify(type, message);
  }

}
