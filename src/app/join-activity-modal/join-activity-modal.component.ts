import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-join-activity-modal',
  templateUrl: './join-activity-modal.component.html',
  styleUrls: ['./join-activity-modal.component.css']
})
export class JoinActivityModalComponent {
  activityName: string = "";

  constructor(private http: HttpClient) { }

  joinActivity() {
    // Input validation here, again
    if (this.activityName.trim() === "") {
      // Handle invalid input, show error message, etc. etc.
      return;
    }

    // The POST request..but I think we will use a service here instead
    this.http.post('/api/activities', { name: this.activityName }).subscribe(
      (response) => {
        // Handle the response from the backend
        console.log(response);
      },
      (error) => {
        // Handle any error that occurs during the POST request
        console.error(error);
      }
    );
  }
}
