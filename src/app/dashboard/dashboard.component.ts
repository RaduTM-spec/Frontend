import {Component, inject} from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import {User} from "../models/user";
import {Team} from "../models/team";
import {TeamService} from "../services/team.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {ActivityService} from "../services/activity.service";
import {Activity} from "../models/activity";


// declare var $: any; // Declared the $ symbol from jQuery


@Component({
  selector: 'app-dashboard',
  templateUrl:  './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  activitiesService: ActivityService = inject(ActivityService);
  activity: Activity | undefined;


  teamsList: Team[] = [];
  teamsService: TeamService = inject(TeamService);
  teamsActivity: Team[] = [];

  usersList: User[] = [];
  usersService: UserService = inject(UserService);

  joinActivityModalRef: ElementRef;
  createActivityModalRef: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {

    const activityName:string = this.route.snapshot.params['name'];
    this.activity = this.activitiesService.getActivityByName(activityName);



    this.teamsList = this.teamsService.getAllTeams();
    this.usersList = this.usersService.getAllUsers();
    this.teamsActivity = this.teamsList.filter((team) => { return team.activity === this.activity?.id;});



    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;
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
