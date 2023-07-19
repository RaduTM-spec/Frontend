import {Component, inject} from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import {User} from "../models/user";
import {Team} from "../models/team";
import {TeamService} from "../services/team.service";
import {UserService} from "../services/user.service";


// declare var $: any; // Declared the $ symbol from jQuery


@Component({
  selector: 'app-dashboard',
  templateUrl:  './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  teamsList: Team[] = [];
  teamsService: TeamService = inject(TeamService);

  usersList: User[] = [];
  usersService: UserService = inject(UserService);

  joinActivityModalRef: ElementRef;
  createActivityModalRef: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;
    this.teamsList = this.teamsService.getAllTeams();
    this.usersList = this.usersService.getAllUsers();
  }

  teamGrade: number = 7;

  userType: string = "mentor";

  isMentor: boolean = false;
  isMember: boolean = false;
  isLead: boolean = false;

  activityName: String = "";

  exportSituation() {

  }
}
