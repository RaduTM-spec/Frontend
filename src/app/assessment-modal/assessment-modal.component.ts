
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Activity} from "../models/activity";
import {Assessment} from "../models/assessment";


@Component({
  selector: 'app-assessment-modal',
  templateUrl: './assessment-modal.component.html',
  styleUrls: ['./assessment-modal.component.css']
})
export class AssessmentModalComponent {

  // @ts-ignore
  @Input() teamUsers: User[];
  // @Output() saveAssessmentEvent = new EventEmitter<Assessment[]>(); // Update the type to Assessment[]

  // assessments: Assessment[] = [];
  //
  // // @ts-ignore
  // mentor: User;
  //
  // // @ts-ignore
  // activity: Activity;

  constructor(private http: HttpClient) {
    console.log("assessment modal constructed!");
  }

  // saveAssessment() {
  //   // Create an assessment for each team user and push it to the assessments array
  //   this.assessments = this.teamUsers.map(user => ({
  //     id: 0, // You can assign an appropriate value for the assessment ID or handle it on the backend
  //     title: "Assessment Title", // Provide an appropriate title for the assessment or handle it as needed
  //     activity: this.activity,
  //     mentor: this.mentor,
  //     user: user,
  //     grade: user.grade,
  //     attended: true,
  //     comment: ""
  //   }));
  //
  //   // Emit the assessments array to the parent component to send it to the backend
  //   this.saveAssessmentEvent.emit(this.assessments);
  // }


  markAllAsAttended() {
    this.teamUsers.forEach(user => (user.attendances += 1));
  }
}
