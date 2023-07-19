import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserBoxComponent} from "./user-box/user-box.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MentorViewTeamComponent} from "./dashboard/mentor-view-team/mentor-view-team.component";

const routes: Routes = [
  {path:'user', component:UserBoxComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'team/:name', component:MentorViewTeamComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [UserBoxComponent,DashboardComponent,MentorViewTeamComponent]
