import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';


declare var $: any; // Declared the $ symbol from jQuery


@Component({
  selector: 'app-dashboard',
  templateUrl:  './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  teamGrade: number = 7;

  isMentor: boolean = false;
  isMember: boolean = false;
  isLead: boolean = false;
  teams: any[] = [];
  members: any[] = [];
  activityName: String = "";

  joinActivityModalRef: ElementRef;
  createActivityModalRef: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;
  }



  showJoinActivityModal() {
    const joinActivityModal = this.joinActivityModalRef.nativeElement.querySelector('#joinActivityModal');
    this.renderer.addClass(joinActivityModal, 'show');
    this.renderer.setStyle(joinActivityModal, 'display', 'block');

    // Close modal when clicking outside or on close button (x)
    this.renderer.listen(joinActivityModal, 'click', (event) => {
      if (event.target === joinActivityModal || event.target.classList.contains('close')) {
        this.renderer.removeClass(joinActivityModal, 'show');
        this.renderer.setStyle(joinActivityModal, 'display', 'none');
      }
    });
  }

  showCreateActivityModal() {
    const createActivityModal = this.createActivityModalRef.nativeElement.querySelector('#createActivityModal');
    this.renderer.addClass(createActivityModal, 'show');
    this.renderer.setStyle(createActivityModal, 'display', 'block');

    // Close modal when clicking outside or on close button (x)
    this.renderer.listen(createActivityModal, 'click', (event) => {
      if (event.target === createActivityModal || event.target.classList.contains('close')) {
        this.renderer.removeClass(createActivityModal, 'show');
        this.renderer.setStyle(createActivityModal, 'display', 'none');
      }
    });
  }


  closeModalOnOutsideClick() {
    const modalBackdrop = document.getElementsByClassName('modal-backdrop');
    if (modalBackdrop && modalBackdrop.length > 0) {
      this.renderer.removeChild(document.body, modalBackdrop[0]);
    }
  }

}
