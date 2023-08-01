import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Activity} from "../models/activity";
import {ActivityService} from "../services/activity.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {TeamService} from "../services/team.service";
import {catchError, Observable, tap} from "rxjs";
import {ErrorHandlingService} from "../services/error-handling.service";
import {AppState} from "../enums/app-state.enum";
import {AuthenticationService} from "../services/authentication.service";

declare var $: any; // Declared the $ symbol from jQuery

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  panelState: AppState = AppState.EMPTY;

  enrolledActivities$: Observable<Activity[]> | undefined;

  loggedUser: any;


  joinActivityModalRef: ElementRef;
  createActivityModalRef: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
              private activityService: ActivityService,
              private userService: UserService,
              private authService: AuthenticationService,
              private teamService: TeamService,
              private renderer: Renderer2,
              private elementRef: ElementRef,
              private errorHandlingService: ErrorHandlingService
  ) {
    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;
  }

  ngOnInit() {
    // this.loggedUser = this.userService.getLoggedUser();
    this.panelState = AppState.LOADING;
    this.loggedUser = this.authService.loggedUser;

    this.enrolledActivities$ = this.activityService.getActivities(this.loggedUser.user.name)
      .pipe(
        tap((activities: Activity[]) => {
          console.log(' > Received enrolled activity:', activities);
          if (activities.length > 0) {
            this.panelState = AppState.LOADED;
          } else {
            this.panelState = AppState.EMPTY;
          }
        }),
        catchError((error) => {
          this.panelState = AppState.EMPTY;
          this.errorHandlingService.handleBackendError(error);
          console.error('Error fetching enrolled activities:', error);
          return [];
        }),
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

  logout(){
    this.authService.logout();
  }

  animation(){
    const element = document.getElementById("i");
    // @ts-ignore
    element.classList.remove("fa-door-closed");
    // @ts-ignore
    element.classList.add("fa-door-open");
  }

  animation2(){
    const element = document.getElementById("i");
    // @ts-ignore
    element.classList.remove("fa-door-open");
    // @ts-ignore
    element.classList.add("fa-door-closed");

  }
  // reloadPage(){
  //   window.location.reload();
  // }

  protected readonly AppState = AppState;
}
