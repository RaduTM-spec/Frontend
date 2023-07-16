import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-activity-modal',
  templateUrl: './create-activity-modal.component.html',
  styleUrls: ['./create-activity-modal.component.css']
})
export class CreateActivityModalComponent {
  newActivityName: string = "";
  endingDate: string = "";

  constructor(private http: HttpClient) { }

  createActivity() {
    // Perform any input validation here
    if (this.newActivityName.trim() === "" || this.endingDate.trim() === "") {
      // Handle invalid input, show error message, etc.
      return;
    }

    // Perform the POST request to the backend API using the HttpClient
    this.http.post('/api/activities', { name: this.newActivityName, endingDate: this.endingDate }).subscribe(
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
