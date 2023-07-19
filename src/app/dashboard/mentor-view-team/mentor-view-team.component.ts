import {Component} from '@angular/core';
import {User} from "../../models/user";

@Component({
  selector: 'app-mentor-view-team',
  templateUrl: './mentor-view-team.component.html',
  styleUrls: ['./mentor-view-team.component.css']
})
export class MentorViewTeamComponent{
  constructor() {
  }
  teamGrade: number = 5;
  members: User[] = [];
  teamName: string = "X";


  exportSituation() {

  }
}
