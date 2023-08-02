import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { User } from '../models/user';
import { AssessmentService } from '../services/assessment.service';
import { Activity } from "../models/activity";
import { catchError } from "rxjs/operators";
import { UserService } from "../services/user.service";
import { ErrorHandlingService } from "../services/error-handling.service";
import { NotificationService } from "../services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Assessment} from "../models/assessment";
import {AuthenticationService} from "../services/authentication.service";

declare var $: any;

@Component({
  selector: 'app-assessment-modal',
  templateUrl: './assessment-modal.component.html',
  styleUrls: ['./assessment-modal.component.css'],
})
export class AssessmentModalComponent implements OnInit, OnChanges {
  @Input() teamUsers: User[] = [];
  @Input() teamName: string = "";
  @Input() activityName!: string;


  markAllAttended: boolean = true;
  markAllButtonText: string = "Mark All Attended";
  markAllButtonColor: string = "btn-success";

  private mentor : User = this.authService.loggedUser.user;

  // private mentor: User = {
  //   id: 1,
  //   name: "Mentor1",
  //   role: "MENTOR",
  //   pictureUrl: "https://robohash.org/hehehe?bgset=bg1"
  // };

  private activity: Activity = {
    id: 1,
    name: this.activityName,
    deadline: '02/08/2023',
    creator: this.mentor
  };

  assessments: Assessment[] = [];

  assessmentTitle: string = "Assessment";

  constructor(
    private assessmentService: AssessmentService,
    private userService: UserService,
    private errorHandlingService: ErrorHandlingService,
    private notificationService: NotificationService,
    private router: Router,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {

  }

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


  ngOnChanges(changes: SimpleChanges) {
    if (changes['teamUsers'] && changes['teamUsers'].currentValue) {
      this.updateAssessments();
    }
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.activityName = params.get('activityName') || '';
      console.log(`got the activityName in assessment modal now: ${this.activityName}`)
      this.teamName = params.get('teamName') || '';
    })

    this.activity = {
      id: 1,
      name: this.activityName,
      deadline: '02/08/2023',
      creator: this.mentor
    };
  }

  ngOnInit() {
    this.authService.delay(100000);
  }

  updateAssessments() {
    let tempId: number = 1;

    this.assessments = this.teamUsers.map((user: User): Assessment => ({
      id: tempId++,
      title: this.assessmentTitle,
      activity: this.activity,
      mentor: this.mentor,
      user: user,
      grade: 5,
      attended: false,
      comment: "None",
    }));
  }

  saveAssessments() {
    let mentorUserName: string = this.mentor.name;
    let newAssessments = this.assessments.filter((assessment) => assessment.attended);
    console.log(newAssessments);
    this.assessmentService
      .sendTeamAssessments(this.activity.name, mentorUserName, this.teamName, newAssessments)
      .pipe(
        catchError((error) => {
          console.error('Error saving assessments:', error);
          this.errorHandlingService.handleBackendError(error);
          $('#assessmentModal').modal('hide');
          return [];
        })
      )
      .subscribe((response) => {
        if (response) {
          window.location.reload();
          console.log('Assessments saved successfully!', response);
          this.notificationService.showSuccessNotification("Session assessments sent successfully!")
          // this.router.navigate(["/team-details"])
          $('#assessmentModal').modal('hide');
        }
      });
  }

  toggleAttendance(assessment: Assessment) {
    assessment.attended = !assessment.attended;
  }

  toggleMarkAll() {
    this.markAllAttended = !this.markAllAttended;
    this.markAllButtonText = this.markAllAttended ? "Mark All Attended" : "Mark All Unattended";
    this.markAllButtonColor = this.markAllAttended ? "btn-success" : "btn-danger";
    this.setAttendanceForAll(!this.markAllAttended);
  }

  setAttendanceForAll(attended: boolean) {
    this.assessments.forEach((assessment) => {
      assessment.attended = attended;
    });
  }
}
