import {Component, OnInit} from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import {User} from "../models/user";
import {Team} from "../models/team";
import {TeamService} from "../services/team.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {ActivityService} from "../services/activity.service";
import {catchError, Observable, tap} from "rxjs";


// declare var $: any; // Declared the $ symbol from jQuery


@Component({
  selector: 'app-dashboard',
  templateUrl:  './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  loggedUser: User;
  activityTeams$: Observable<Team[]> | undefined;

  joinActivityModalRef: ElementRef;
  createActivityModalRef: ElementRef;

  activityName:string = '';

  constructor(private activatedRoute: ActivatedRoute, private activitiesService: ActivityService,private  teamService: TeamService,private  usersService: UserService, private renderer: Renderer2, private elementRef: ElementRef) {

    this.loggedUser = usersService.getLoggedUser();

    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;
  }

  ngOnInit(){
    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;

    this.activatedRoute.queryParamMap.subscribe((params) => {
        this.activityName = params.get('activityName') || '';
        this.loggedUser = this.usersService.getLoggedUser();
    })

    this.activityTeams$ = this.teamService.getActivityTeams(this.loggedUser.name, this.activityName)
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

  exportSituation(){

  }

}
