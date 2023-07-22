
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";


@Component({
  selector: 'app-assessment-modal',
  templateUrl: './assessment-modal.component.html',
  styleUrls: ['./assessment-modal.component.css']
})
export class AssessmentModalComponent {

  // @ts-ignore
  @Input() teamUsers: User[];
  @Output() saveAssessmentEvent = new EventEmitter<User[]>();

  constructor(private http: HttpClient) {}

  saveAssessment() {
    // to emit the updated teamUsers array to the parent component
    this.saveAssessmentEvent.emit(this.teamUsers);
  }

}
