// app-assessment-modal.component.ts

import {Component, Input, OnInit} from '@angular/core';
import { User } from '../models/user';
import { Assessment } from '../models/assessment';
import { AssessmentService } from '../services/assessment.service';
import {Activity} from "../models/activity";
import {catchError, of} from "rxjs";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-assessment-modal',
  templateUrl: './assessment-modal.component.html',
  styleUrls: ['./assessment-modal.component.css'],
})
export class AssessmentModalComponent implements OnInit
{
  @Input() teamUsers: User[] = [];
  @Input() teamName: string = "";

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

  assessments: Assessment[] = [];

  assessmentTitle: string = "Assessment";


  constructor(private assessmentService: AssessmentService,
              private userService: UserService) {}

  markAllAsAttended() {
    this.assessments.forEach((assessment) => {
      assessment.attended = !assessment.attended;
    });
  }

  ngOnInit() {
    let tempId: number = 1;

    this.assessments = this.teamUsers.map((user : User) : Assessment => ({
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


  // UNFINISHED
  saveAssessments() {

    let mentorUserName: string = this.userService.getLoggedUser().username;

    this.assessmentService
      .sendTeamAssessments(this.assessments, mentorUserName, this.activity.name, this.teamName).pipe(
      catchError((error) => {
        console.error('Error saving assessments:', error);
        return of(null);
      })
    )
      .subscribe((response) => {
        if (response) {
          console.log('Assessments saved successfully!', response);
        }
      });
  }

  toggleAttendance(assessment: Assessment) {
    assessment.attended = !assessment.attended;

  }
}
