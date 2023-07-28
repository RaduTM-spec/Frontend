import {Component, Input} from '@angular/core';
import {Assessment} from "../../models/assessment";

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.css']
})
export class SessionCardComponent {
  @Input() assessment: Assessment | undefined;

}
