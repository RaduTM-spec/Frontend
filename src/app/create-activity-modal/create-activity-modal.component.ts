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
    // Input validation here somewhere
    if (this.newActivityName.trim() === "" || this.endingDate.trim() === "") {
      return;
    }

    // POST request to the backend API using the HttpClient
    this.http.post('/api/activities', { name: this.newActivityName, endingDate: this.endingDate }).subscribe(
      (response) => {
        // Handle the response from the backend
        console.log(response);
      },
      (error) => {
        // Error that occurs during the POST request
        console.error(error);
      }
    );
  }
}
