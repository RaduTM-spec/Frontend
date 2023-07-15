import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {
  @Input() teamName: string = "TeamNameHere";
  @Input() teamLeader: string = "Leader";
  @Input() teamGrade: number = 10;

}
