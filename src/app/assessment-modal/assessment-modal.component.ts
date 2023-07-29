// app-assessment-modal.component.ts

import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { Assessment } from '../models/assessment';
import { AssessmentService } from '../services/assessment.service';
import {Activity} from "../models/activity";

@Component({
  selector: 'app-assessment-modal',
  templateUrl: './assessment-modal.component.html',
  styleUrls: ['./assessment-modal.component.css'],
})
export class AssessmentModalComponent {
  @Input() teamUsers: User[] = [];
  assessments: Assessment[] = [];
  private activity: Activity = {
    id: 1,
    name: "Activity1"
  };
  private mentor: User = {
    id: 9,
    username: "vasile",
    role: "mentor",
    attendances: 20,
    grade: 10,
    imageUrl: "https://robohash.org/hehehe?bgset=bg1"
  };

  constructor(private assessmentService: AssessmentService) {}

  markAllAsAttended() {
    this.teamUsers.forEach((user) => (user.attendances += 1));
  }

  saveAssessments() {
    this.assessments = this.teamUsers.map((user : User) : Assessment => ({
      id: user.id,
      title: 'Team Assessment',
      activity: this.activity,
      mentor: this.mentor,
      user: user,
      grade: user.grade,
      attended: true,
      comment: 1,
    }));

    // Send the assessments to the backend
    // this.assessmentService
    //   .saveTeamAssessments(this.assessments)
    //   .subscribe((response) => {
    //     // Handle the response from the backend if needed
    //     console.log('Assessments saved successfully!');
    //   });
  }
}
