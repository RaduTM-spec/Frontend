import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {User} from "../models/user";

@Component({
  selector: 'app-add-attendance-modal',
  templateUrl: './add-attendance-modal.component.html',
  styleUrls: ['./add-attendance-modal.component.css']
})
export class AddAttendanceModalComponent implements OnInit {
  members: User[] = [
    // Replace with actual attendees data
    { imageUrl: '...', name: 'John Doe', role: 'Developer', checked: false },
    { profilePicture: '...', name: 'Jane Smith', role: 'Designer', checked: false },
    // Add more attendees as needed
  ];

  constructor(public dialogRef: MatDialogRef<AddAttendanceModalComponent>) {}

  ngOnInit() {}

  addAttendances(): void {
    const newAttendances = this.members
      // .filter(member => member.checked)
      // .map(member => ({
      //   name: member.username,
      //   role: member.role
      // }));

    console.log('New Attendances:', newAttendances);

    this.dialogRef.close();
  }

}


//
// interface Attendee {
//   profilePicture: string;
//   name: string;
//   role: string;
//   checked: boolean;
// }


