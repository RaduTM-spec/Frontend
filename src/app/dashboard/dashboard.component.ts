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


  //members variables;
  membersList: User[] = [];
  loggedUserTeam: Team;

  // mentor variables
  teamsList: Team[] = [];
  teamsActivity: Team[] = [];
  usersList: User[] = [];


  joinActivityModalRef: ElementRef;
  createActivityModalRef: ElementRef;

  constructor(private route: ActivatedRoute, private activitiesService: ActivityService,private  teamsService: TeamService,private  usersService: UserService, private renderer: Renderer2, private elementRef: ElementRef) {

    this.activityName = this.route.snapshot.params['name'];
    this.activity = this.activitiesService.getActivityByName(this.activityName);
    this.loggedUser = usersService.getLoggedUser();
    this.loggedUserTeam = this.teamsService.getUserTeam(this.loggedUser.id);

    this.teamsList = this.teamsService.getAllTeams();
    this.usersList = this.usersService.getAllUsers();
    this.teamsActivity = this.teamsList.filter((team) => { return team.activities.includes(<number>this.activity?.id);});

    this.membersList = this.usersList.filter((user) => { return this.loggedUserTeam.members.includes(user.id);});

    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;
  }

  ngOnInit(){
    this.route.paramMap.subscribe((params) => {
        this.activityName = params.get('name') || '';
        this.activity = this.activitiesService.getActivityByName(this.activityName);
        this.loggedUser = this.usersService.getLoggedUser();
        this.loggedUserTeam = this.teamsService.getUserTeam(this.loggedUser.id);

        this.teamsList = this.teamsService.getAllTeams();
        this.usersList = this.usersService.getAllUsers();
        this.teamsActivity = this.teamsList.filter((team) => { return team.activities.includes(<number>this.activity?.id);});

        this.membersList = this.usersList.filter((user) => { return this.loggedUserTeam.members.includes(user.id);});

        this.joinActivityModalRef = this.elementRef;
        this.createActivityModalRef = this.elementRef;
    })
  }
  teamGrade: number = 7;

}
