import {AfterViewInit, Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {AssessmentModalComponent} from "../../assessment-modal/assessment-modal.component";
import {catchError, Observable, tap} from "rxjs";
import {TeamDetails} from "../../models/team-details";
import {TeamService} from "../../services/team.service";

declare var $: any;

@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.css']
})
export class InfoContainerComponent implements OnInit, AfterViewInit{
  @Input() userType: string = '';
  @Input() teamGrade: number = 0;
  @Input() number: number = 0;
  activityName: string = '';
  teamName: string = '';

  loggedUser: User | undefined;

  teamMembers: User[];

  teamDetails$: Observable<TeamDetails> | undefined;

  exportSituation() {
  }
  @ViewChild(AssessmentModalComponent, { static: false }) assessmentModalComponent!: AssessmentModalComponent;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private teamService: TeamService, private renderer: Renderer2) {
    console.log("assessment modal constructed!");
    this.teamMembers = userService.getAllUsers(); // Fetch the team members using UserService
  }

  ngOnInit() {
    this.loggedUser = this.userService.getLoggedUser();
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.activityName = params.get('activityName') || '';
      this.teamName = params.get('teamName') || '';
    })

    this.teamDetails$ = this.teamService.getTeamDetailsFromAnActivity(this.loggedUser?.username, this.activityName, this.teamName)
      .pipe(
        tap((teamDetails: TeamDetails) => {
          console.log(' > Received team details:', teamDetails);
        }),
        catchError((error) => {
          console.error('Error fetching team details:', error);
          return [];
        })
      );
  }

  openAssessmentModal(): void {
    // we need to pass the team members array to the assessment modal
    if (this.assessmentModalComponent) {
      this.assessmentModalComponent.teamUsers = this.teamMembers;
    }

    const assessmentModal = document.getElementById('assessmentModal');
    console.log("in open assessment modal!");
    if (assessmentModal) {
      $(assessmentModal).modal('show');

      this.renderer.listen(assessmentModal, 'click', (event) => {
        if (
          event.target === assessmentModal ||
          event.target.classList.contains('close') ||
          (event.target.classList.contains('btn') && event.target.classList.contains('btn-secondary'))
        ) {
          $(assessmentModal).modal('hide');
        }
      });
    }
  }

  handleSaveAssessment(teamUsers: User[]) {
    console.log(teamUsers);
  }

  getPath(){
    return window.location.pathname == '/activity-teams';
  }

  ngAfterViewInit(): void {
  }
}
