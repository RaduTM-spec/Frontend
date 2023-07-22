
import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { User } from "../../models/user";
import {UserService} from "../../services/user.service";

declare var $: any;

@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.css']
})
export class InfoContainerComponent {
  @Input() userType: string = '';
  @Input() teamGrade: number = 0;
  @Input() number: number = 0;

  exportSituation() {
  }

  teamMembers: User[];

  @ViewChild('assessmentModalRef', { static: true }) assessmentModalRef!: ElementRef;

  constructor(private renderer: Renderer2, private userService: UserService) {
    this.teamMembers = userService.getAllUsers();
  }

  openAssessmentModal() {
    const assessmentModal = this.assessmentModalRef.nativeElement.querySelector('#assessmentModal');
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
}
