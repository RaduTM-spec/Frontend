import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotifierService} from "angular-notifier";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  constructor(private snackBar: MatSnackBar, private notifierService: NotifierService) { }

  handleBackendError(error: any): void {
    if (error?.error?.message) {
      this.showNotification(error.error.message);
    } else {
      this.showNotification('An unknown error occurred. Please try again later.');
    }
  }

  private showNotification(message: string): void {
    this.notifierService.notify('error', message, 'error')
  }



  //
  // private showErrorPopup(message: string): void {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 5000,
  //     panelClass: ['error-snackbar'],
  //   });
  // }
}
