import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import {User} from "../models/user";


declare var $: any; // Declared the $ symbol from jQuery


@Component({
  selector: 'app-dashboard',
  templateUrl:  './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  teamGrade: number = 7;

  userType: string = "team lead";

  isMentor: boolean = false;
  isMember: boolean = false;
  isLead: boolean = false;
  teams: any[] = [];
  members: User[] = [{
    id: 1,
    username: "john_doe",
    role: "TEAM LEAD",
    attendances: 20,
    grade: 9.5,
    imageUrl: "https://robohash.org/john_doe?bgset=bg1",
  },
    {
      id: 2,
      username: "jane_smith",
      role: "MEMBER",
      attendances: 15,
      grade: 8.5,
      imageUrl: "https://robohash.org/bruhdh?bgset=bg1",
    },
    {
      id: 3,
      username: "mike_johnson",
      role: "MEMBER",
      attendances: 10,
      grade: 7.5,
      imageUrl: "https://robohash.org/asdasdaaaa?bgset=bg1",
    },
    {
      id: 4,
      username: "bob_williams",
      role: "MEMBER",
      attendances: 5,
      grade: 4.5,
      imageUrl: "https://robohash.org/asdasdasd?bgset=bg1",
    },
    {
      id: 5,
      username: "david_brown",
      role: "MEMBER",
      attendances: 12,
      grade: 9.5,
      imageUrl: "https://robohash.org/hehehe?bgset=bg1",
    },
    {
      id: 6,
      username: "emily_clark",
      role: "MEMBER",
      attendances: 8,
      grade: 6.5,
      imageUrl: "https://robohash.org/idk-bruh-idk?bgset=bg1",
    },];
  activityName: String = "";

  joinActivityModalRef: ElementRef;
  createActivityModalRef: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.joinActivityModalRef = this.elementRef;
    this.createActivityModalRef = this.elementRef;
  }


  //
  // showJoinActivityModal() {
  //   const joinActivityModal = this.joinActivityModalRef.nativeElement.querySelector('#joinActivityModal');
  //   $(joinActivityModal).modal('show');
  //
  //   // Close modal when clicking outside or on close button (x)
  //   this.renderer.listen(joinActivityModal, 'click', (event) => {
  //     if (
  //       event.target === joinActivityModal ||
  //       event.target.classList.contains('close') ||
  //       event.target.classList.contains('btn') &&
  //       event.target.classList.contains('btn-secondary')
  //     ) {
  //       $(joinActivityModal).modal('hide');
  //     }
  //   });
  // }
  //
  // showCreateActivityModal() {
  //   const createActivityModal = this.createActivityModalRef.nativeElement.querySelector('#createActivityModal');
  //   $(createActivityModal).modal('show');
  //
  //   // Close modal when clicking outside or on close button (x)
  //   this.renderer.listen(createActivityModal, 'click', (event) => {
  //     if (
  //       event.target === createActivityModal ||
  //       event.target.classList.contains('close') ||
  //       event.target.classList.contains('btn') &&
  //       event.target.classList.contains('btn-secondary')
  //     ) {
  //       $(createActivityModal).modal('hide');
  //     }
  //   });
  // }
  //
  //
  // closeModalOnOutsideClick() {
  //   const modalBackdrop = document.getElementsByClassName('modal-backdrop');
  //   if (modalBackdrop && modalBackdrop.length > 0) {
  //     this.renderer.removeChild(document.body, modalBackdrop[0]);
  //   }
  // }


  exportSituation() {

  }
}
