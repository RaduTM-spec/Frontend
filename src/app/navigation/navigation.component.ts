import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Activity} from "../models/activity";
import {ActivityService} from "../services/activity.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {TeamService} from "../services/team.service";
import {catchError, Observable, tap} from "rxjs";
import {UserTeamDTO} from "../models/user-team-dto";

declare var $: any; // Declared the $ symbol from jQuery

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  loggedUser: User;
  userRole: string = '';

  enrolledActivities$: Observable<Activity[]> | undefined;
  loggedUser$: Observable<UserTeamDTO> | undefined;


  joinActivityModalRef: ElementRef;
  createActivityModalRef: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, private activityService: ActivityService, private userService:UserService, private teamService:TeamService,private renderer: Renderer2, private elementRef: ElementRef) {
    this.loggedUser = userService.getLoggedUser();

    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;
  }

  ngOnInit() {
    this.loggedUser = this.userService.getLoggedUser();

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

    this.loggedUser$ = this.userService.authenticateUser(this.loggedUser.name)
      .pipe(
        tap((loggedUser: UserTeamDTO) => {
          console.log(' > Received logged user:', loggedUser);
        }),
        catchError((error) => {
          console.error('Error fetching logged user:', error);
          return [];
        })

      );
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
