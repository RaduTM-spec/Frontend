import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-activity-modal',
  templateUrl: './create-activity-modal.component.html',
  styleUrls: ['./create-activity-modal.component.css']
})

export class CreateActivityModalComponent implements OnInit {
  activityName: string = "";
  endDate: Date = new Date();

  constructor(public dialogRef: MatDialogRef<CreateActivityModalComponent>) {}

  ngOnInit() {}

}
