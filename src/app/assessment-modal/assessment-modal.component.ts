// app-assessment-modal.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Assessment } from '../models/assessment';
import { AssessmentService } from '../services/assessment.service';
import { Activity } from "../models/activity";
import { catchError } from "rxjs/operators";
import { UserService } from "../services/user.service";
import {ErrorHandlingService} from "../services/error-handling.service";
import {NotificationService} from "../services/notification.service";

declare var $: any;


@Component({
  selector: 'app-assessment-modal',
  templateUrl: './assessment-modal.component.html',
  styleUrls: ['./assessment-modal.component.css'],
})
export class AssessmentModalComponent implements OnInit {
  @Input() teamUsers: User[] = [];
  @Input() teamName: string = "";

  markAllAttended: boolean = true;
  markAllButtonText: string = "Mark All Attended";
  markAllButtonColor: string = "btn-success";

  private activity: Activity = {
    name: "Activity1",
    deadline: '02/08/2023',
    creator: {
      id: 9,
      name: "vasile",
      role: "mentor",
      attendances: 20,
      grade: 10,
      pictureUrl: "https://robohash.org/hehehe?bgset=bg1"
    }
  };

  private mentor: User = {
    id: 9,
    name: "vasile",
    role: "mentor",
    attendances: 20,
    grade: 10,
    pictureUrl: "https://robohash.org/hehehe?bgset=bg1"
  };

  assessments: Assessment[] = [];

  assessmentTitle: string = "Assessment";

  constructor(
    private assessmentService: AssessmentService,
    private userService: UserService,
    private errorHandlingService: ErrorHandlingService,
    private notificationService: NotificationService
  ) {}

  markAllAsAttended() {
    this.markAllAttended = true;
    this.markAllButtonColor = "btn-danger";
    this.markAllButtonText = "Mark All Unattended";
    this.setAttendanceForAll(true);
  }

  markAllAsUnattended() {
    this.markAllAttended = false;
    this.markAllButtonColor = "btn-success";
    this.markAllButtonText = "Mark All Attended";
    this.setAttendanceForAll(false);
  }

  setAttendanceForAll(attended: boolean) {
    this.assessments.forEach((assessment) => {
      assessment.attended = attended;
    });
  }

  ngOnInit() {
    let tempId: number = 1;

    this.assessments = this.teamUsers.map((user: User): Assessment => ({
      id: tempId++,
      title: this.assessmentTitle,
      activity: this.activity,
      mentor: this.mentor,
      user: user,
      grade: 5,
      attended: false,
      comment: "",
    }));
  }

  saveAssessments() {
    let mentorUserName: string = this.userService.getLoggedUser().name;
    let newAssessments = this.assessments.filter((assessment) => assessment.attended);

    this.assessmentService
      .sendTeamAssessments(this.activity.name, mentorUserName, this.teamName, newAssessments)
      .pipe(
        catchError((error) => {
          console.error('Error saving assessments:', error);
          this.errorHandlingService.handleBackendError(error);
          return [];
        })
      )
      .subscribe((response) => {
        if (response) {
          console.log('Assessments saved successfully!', response);
          this.notificationService.showSuccessNotification("Session assessments sent successfully!")
          $('#assessmentModal').modal('hide');
        }
      });
  }

  toggleAttendance(assessment: Assessment) {
    assessment.attended = !assessment.attended;
  }
}
