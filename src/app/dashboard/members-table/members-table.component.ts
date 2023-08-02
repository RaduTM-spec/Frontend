import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, Observable, tap} from "rxjs";
import {TeamDetails} from "../../models/team-details";
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.css']
})
export class MembersTableComponent {
  @Input() userType: string = '';
  @Input() teamDetails: any;

  teamLeaderName = '';
  teamName = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService
  ) {
  }
  removeMember(removedMemberName: string){
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.teamLeaderName = params.get('userName') || '';
      this.teamName = params.get('teamName') || '';
    })

    console.log(this.teamLeaderName, removedMemberName, this.teamName);
    this.teamService.removeMemberFromTeam(this.teamLeaderName, removedMemberName, this.teamName);

  }

}
