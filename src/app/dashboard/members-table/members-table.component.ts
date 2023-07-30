import {Component, Input} from '@angular/core';
import {TeamDetails} from "../../models/team-details";

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.css']
})
export class MembersTableComponent {
  @Input() userType: string = '';
  @Input() teamDetails!: TeamDetails;

}
