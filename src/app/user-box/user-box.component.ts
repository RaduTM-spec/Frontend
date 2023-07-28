import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {TeamService} from "../services/team.service";
import {Team} from "../models/team";
import {ActivatedRoute} from "@angular/router";
import {Assessment} from "../models/assessment";
import {AssessmentService} from "../services/assessment.service";
import {catchError, Observable, tap} from "rxjs";

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent implements OnInit{

  loggedUser: User | undefined;
  loggedUserTeam: Team | undefined;
  userAssessments$: Observable<Assessment[]> | undefined;



  constructor(private  activatedRoute: ActivatedRoute, private userService:UserService, private teamService: TeamService,
              private assessmentService: AssessmentService) {

    // this.user = userService.getLoggedUser();
    // // this.user = this.activatedRoute.snapshot.queryParamMap.get('user');
    // if(this.user.role != 'mentor')
    //   this.team = teamService.getUserTeam(this.user.id);


  }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser();

    if (this.loggedUser.role != "mentor") {
      this.loggedUserTeam = this.teamService.getUserTeam(this.loggedUser.id);
      this.userAssessments$ = this.assessmentService.getUserAssessments(this.loggedUser.username) // Call the method to get user assessments
        .pipe(
          tap((assessments: Assessment[]) => {
            console.log(' > Received user assessments:', assessments);
          }),
          catchError((error) => {
            console.error('Error fetching user assessments:', error);
            return [];
          })
        );
    }

  }



}
