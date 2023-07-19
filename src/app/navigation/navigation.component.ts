import {Component, inject} from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import {Activity} from "../models/activity";
import {ActivityService} from "../services/activity.service";

declare var $: any; // Declared the $ symbol from jQuery

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  activitiesList: Activity[] = [];
  activitiesService: ActivityService = inject(ActivityService);

  joinActivityModalRef: ElementRef;
  createActivityModalRef: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;
    this.activitiesList = this.activitiesService.getAllActivities();
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

  reloadPage(){
    window.location.reload();
  }
}
