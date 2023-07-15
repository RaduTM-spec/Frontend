import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-join-activity-modal',
  templateUrl: './join-activity-modal.component.html',
  styleUrls: ['./join-activity-modal.component.css']
})
export class JoinActivityModalComponent implements OnInit {
  activityName: string = "";

  constructor(public dialogRef: MatDialogRef<JoinActivityModalComponent>) {}

  ngOnInit() {}

}
