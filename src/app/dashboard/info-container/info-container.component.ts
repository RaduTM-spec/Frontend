import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import {ActivatedRoute} from "@angular/router"; // Import the UserService

declare var $: any;

@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.css']
})
export class InfoContainerComponent implements OnInit{
  @Input() userType: string = '';
  @Input() teamGrade: number = 0;
  @Input() number: number = 0;
  activityName: string = '';
  teamName: string = '';

  teamMembers: User[];

  exportSituation() {
  }

  @ViewChild('assessmentModalRef') assessmentModalRef!: ElementRef; // removed { static: true } idk if it helps or not

  constructor(private activatedRoute: ActivatedRoute, private renderer: Renderer2, private userService: UserService) {
    console.log("assessment modal constructed!")
    this.teamMembers = userService.getAllUsers(); // Fetch the team members using UserService


  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.activityName = params.get('activityName') || '';
      this.teamName = params.get('teamName') || '';
    })
  }


  openAssessmentModal(): void {
    const assessmentModal = this.assessmentModalRef.nativeElement.querySelector('#assessmentModal');
    console.log("in open assessment modal!")
    $(assessmentModal).modal('show');

    this.renderer.listen(assessmentModal, 'click', (event) => {
      if (
        event.target === assessmentModal ||
        event.target.classList.contains('close') ||
        event.target.classList.contains('btn') &&
        event.target.classList.contains('btn-secondary')
      ) {
        $(assessmentModal).modal('hide');
      }
    });
  }

  handleSaveAssessment(teamUsers: User[]) {
    console.log(teamUsers);
  }

  getPath(){
    return window.location.pathname == '/activity-teams';
  }
}
