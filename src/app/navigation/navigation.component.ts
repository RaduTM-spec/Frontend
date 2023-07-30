import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Activity} from "../models/activity";
import {ActivityService} from "../services/activity.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {TeamService} from "../services/team.service";
import {Team} from "../models/team";
import {catchError, Observable, tap} from "rxjs";

declare var $: any; // Declared the $ symbol from jQuery

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  activitiesList: Activity[] = [];
  loggedUser: User;
  team: Team | undefined;
  userRole: string = '';

  enrolledActivities$: Observable<Activity[]> | undefined;


  joinActivityModalRef: ElementRef;
  createActivityModalRef: ElementRef;

  getTeam(){
    return this.teamService.getUserTeam(this.loggedUser.id);
  }
  constructor(private activatedRoute: ActivatedRoute, private activityService: ActivityService, private userService:UserService, private teamService:TeamService,private renderer: Renderer2, private elementRef: ElementRef) {
    this.loggedUser = userService.getLoggedUser();

    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;
  }

  ngOnInit() {
    this.loggedUser = this.userService.getLoggedUser();
    if(this.loggedUser.role != 'mentor'){
      this.team = this.getTeam();
    }

    this.enrolledActivities$ = this.activityService.getActivities(this.loggedUser.name)
      .pipe(
        tap((activities: Activity[]) => {
          console.log(' > Received enrolled activity:', activities);
        }),
        catchError((error) => {
          console.error('Error fetching enrolled activities:', error);
          return [];
        })

      );
    // this.enrolledActivities$ = this.activityService.get();
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
