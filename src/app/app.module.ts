import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { ProjectModule } from './project/project.module';


import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { UserService } from './shared/user/user.service';
import { ProjectService } from './shared/project/project.service';
import { IssueTrackerService } from './shared/issue-tracker/issue-tracker.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ProjectModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    ProjectService,
    IssueTrackerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
