import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  teamGrade: number = 6;

  isMentor: boolean = false;
  isMember: boolean = false;
  isLead: boolean = false;
  teams: any[] = [];
  members: any[] = [];
}
