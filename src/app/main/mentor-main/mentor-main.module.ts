import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateActivityFrameComponent } from './create-activity-frame/create-activity-frame.component';
import { ViewTeamFrameComponent } from './view-team-frame/view-team-frame.component';
import { EvaluationFrameComponent } from './evaluation-frame/evaluation-frame.component';



@NgModule({
  declarations: [
    CreateActivityFrameComponent,
    ViewTeamFrameComponent,
    EvaluationFrameComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MentorMainModule { }
