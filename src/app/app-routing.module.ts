import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserBoxComponent } from "./user-box/user-box.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ViewTeamComponent } from "./dashboard/view-team/view-team.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: 'user-assessments', component: UserBoxComponent },
  { path: 'activity-teams', component: DashboardComponent },
  { path: 'team-details', component: ViewTeamComponent },
  { path: 'login', component: LoginComponent }, // Renamed 'new' to 'login' for clarity
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to LoginComponent by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [UserBoxComponent,DashboardComponent,ViewTeamComponent]
