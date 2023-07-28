import {Component, Input} from '@angular/core';
import {Activity} from "../../models/activity";
import {User} from "../../models/user";
import {Team} from "../../models/team";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent{
  @Input() activity!: Activity;
  @Input() user!: User;
  @Input() team!: Team;
}
