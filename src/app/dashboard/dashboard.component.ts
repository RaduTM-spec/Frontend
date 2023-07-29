import {Component, OnInit} from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import {User} from "../models/user";
import {Team} from "../models/team";
import {TeamService} from "../services/team.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {ActivityService} from "../services/activity.service";
import {Activity} from "../models/activity";
import {catchError, Observable, tap} from "rxjs";


// declare var $: any; // Declared the $ symbol from jQuery


@Component({
  selector: 'app-dashboard',
  templateUrl:  './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  activityName:string = '';
  activity: Activity | undefined;
  loggedUser: User;
  loggedUserTeam: Team;

  activityTeams$: Observable<Team[]> | undefined;

  //members variables;
  membersList: User[] = [];

  // mentor variables
  teamsList: Team[] = [];
  teamsActivity: Team[] = [];
  usersList: User[] = [];


  joinActivityModalRef: ElementRef;
  createActivityModalRef: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, private activitiesService: ActivityService,private  teamService: TeamService,private  usersService: UserService, private renderer: Renderer2, private elementRef: ElementRef) {

    this.activity = this.activitiesService.getActivityByName(this.activityName);
    this.loggedUser = usersService.getLoggedUser();
    this.loggedUserTeam = this.teamService.getUserTeam(this.loggedUser.id);

    this.teamsList = this.teamService.getAllTeams();
    this.usersList = this.usersService.getAllUsers();
    this.teamsActivity = this.teamsList.filter((team) => { return team.activities.includes(<number>this.activity?.id);});

    this.membersList = this.usersList.filter((user) => { return this.loggedUserTeam.members.includes(user.id);});

    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;
  }

  ngOnInit(){
    this.activatedRoute.queryParamMap.subscribe((params) => {
        this.activityName = params.get('activityName') || '';
        this.activity = this.activitiesService.getActivityByName(this.activityName);
        this.loggedUser = this.usersService.getLoggedUser();
        this.loggedUserTeam = this.teamService.getUserTeam(this.loggedUser.id);

        this.teamsList = this.teamService.getAllTeams();
        this.usersList = this.usersService.getAllUsers();
        this.teamsActivity = this.teamsList.filter((team) => { return team.activities.includes(<number>this.activity?.id);});

        this.membersList = this.usersList.filter((user) => { return this.loggedUserTeam.members.includes(user.id);});

        this.joinActivityModalRef = this.elementRef;
        this.createActivityModalRef = this.elementRef;


    })

    this.activityTeams$ = this.teamService.getActivityTeams(this.loggedUser.username, this.activityName)
      .pipe(
        tap((teams: Team[]) => {
          console.log(' > Received activity teams:', teams);
        }),
        catchError((error) => {
          console.error('Error fetching activity teams:', error);
          return [];
        })
      );
  }
  teamGrade: number = 7;

  exportSituation(){

  }

}
