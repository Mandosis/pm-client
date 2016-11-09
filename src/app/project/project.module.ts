import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { ProjectComponent }         from './project.component';
import { WikiComponent }            from './wiki/wiki.component';
import { BoardsComponent }          from './boards/boards.component';
import { IssueTrackerComponent }    from './issue-tracker/issue-tracker.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';

import { ProjectRoutingModule } from './project-routing.module';
import { CreateProjectComponent } from './create-project/create-project.component';

import { ProjectGuard } from '../shared/project/project-guard.service';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { NewIssueComponent } from './issue-tracker/new-issue/new-issue.component';
import { IssueListComponent } from './issue-tracker/issue-list/issue-list.component';
import { IssueComponent } from './issue-tracker/issue/issue.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ProjectRoutingModule
  ],
  declarations: [
    ProjectComponent,
    WikiComponent,
    BoardsComponent,
    IssueTrackerComponent,
    ProjectSettingsComponent,
    CreateProjectComponent,
    ProjectHomeComponent,
    NewIssueComponent,
    IssueListComponent,
    IssueComponent,
  ],
  providers: [
    ProjectGuard
  ]
})
export class ProjectModule {}