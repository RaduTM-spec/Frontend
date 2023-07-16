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
    // Perform any input validation here
    if (this.activityName.trim() === "") {
      // Handle invalid input, show error message, etc.
      return;
    }

    // Perform the POST request to the backend API using the HttpClient
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
