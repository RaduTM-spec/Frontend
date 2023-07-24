import {Component} from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import {Activity} from "../models/activity";
import {ActivityService} from "../services/activity.service";
import {Router} from "@angular/router";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {TeamService} from "../services/team.service";
import {Team} from "../models/team";

declare var $: any; // Declared the $ symbol from jQuery

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  activitiesList: Activity[] = [];
  user: User | undefined;
  team: Team | undefined;
  // activitiesService: ActivityService = inject(ActivityService);

  joinActivityModalRef: ElementRef;
  createActivityModalRef: ElementRef;

  userRole: string = '';
  constructor(private router: Router, private activitiesService: ActivityService, private userService:UserService, private teamService:TeamService,private renderer: Renderer2, private elementRef: ElementRef) {
    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;
    this.user = userService.getLoggedUser();
    this.activitiesList = this.activitiesService.getAllActivities();
    if(this.user.role != 'mentor'){
      this.team = this.teamService.getUserTeam(this.user.id);
      this.activitiesList = this.activitiesList.filter((activity) => {return this.team?.activities.includes(activity.id);});
    }
     this.userRole = this.user.role || '';

  }


  showJoinActivityModal() {
    const joinActivityModal = this.joinActivityModalRef.nativeElement.querySelector('#joinActivityModal');
    $(joinActivityModal).modal('show');

    // Close modal when clicking outside or on close button (x)
    this.renderer.listen(joinActivityModal, 'click', (event) => {
      if (
        event.target === joinActivityModal ||
        event.target.classList.contains('close') ||
        event.target.classList.contains('btn') &&
        event.target.classList.contains('btn-secondary')
      ) {
        $(joinActivityModal).modal('hide');
      }
    });
  }

  showCreateActivityModal() {
    const createActivityModal = this.createActivityModalRef.nativeElement.querySelector('#createActivityModal');
    $(createActivityModal).modal('show');

    // Close modal when clicking outside or on close button (x)
    this.renderer.listen(createActivityModal, 'click', (event) => {
      if (
        event.target === createActivityModal ||
        event.target.classList.contains('close') ||
        event.target.classList.contains('btn') &&
        event.target.classList.contains('btn-secondary')
      ) {
        $(createActivityModal).modal('hide');
      }
    });
  }


  closeModalOnOutsideClick() {
    const modalBackdrop = document.getElementsByClassName('modal-backdrop');
    if (modalBackdrop && modalBackdrop.length > 0) {
      this.renderer.removeChild(document.body, modalBackdrop[0]);
    }
  }

  // reloadPage(){
  //   window.location.reload();
  // }

}
