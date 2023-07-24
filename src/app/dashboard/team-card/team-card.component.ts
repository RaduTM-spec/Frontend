import { Component, Input } from '@angular/core';
import {Team} from "../../models/team";

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {
  @Input() team!: Team;
  @Input() activity!: string;

}
