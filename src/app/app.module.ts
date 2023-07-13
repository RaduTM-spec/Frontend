import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { JoinActivityFrameComponent } from './main/join-activity-frame/join-activity-frame.component';
import { MainFrameComponent } from './main/main-frame/main-frame.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    JoinActivityFrameComponent,
    MainFrameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
