import {Component, OnInit} from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import {Team} from "../models/team";
import {TeamService} from "../services/team.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {ActivityService} from "../services/activity.service";
import {catchError, Observable, tap} from "rxjs";
import {UserTeamDTO} from "../models/user-team-dto";


// declare var $: any; // Declared the $ symbol from jQuery


@Component({
  selector: 'app-dashboard',
  templateUrl:  './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  activityTeams$: Observable<Team[]> | undefined;
  loggedUser$: Observable<UserTeamDTO> | undefined;

  joinActivityModalRef: ElementRef;
  createActivityModalRef: ElementRef;

  activityName:string = '';

  constructor(private activatedRoute: ActivatedRoute, private activitiesService: ActivityService,private  teamService: TeamService,private  userService: UserService, private renderer: Renderer2, private elementRef: ElementRef) {

    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;
  }

  ngOnInit(){
    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;

    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.activityName = params.get('activityName') || '';

      this.loggedUser$ = this.userService.user;

      this.loggedUser$?.subscribe(loggedUser => {
        this.activityTeams$ = this.teamService.getActivityTeams(loggedUser.user.name, this.activityName)
          .pipe(
            tap((teams: Team[]) => {
              console.log(` > Received activity ${this.activityName} teams:`, teams);
            }),
            catchError((error) => {
              console.error(`Error fetching activity ${this.activityName} teams:`, error);
              return [];
            })
          );
      })
    })


  }

  exportSituation(){

  }

}
