import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectComponent }         from './project.component';
import { WikiComponent }            from './wiki/wiki.component';
import { BoardsComponent }          from './boards/boards.component';
import { IssueTrackerComponent }    from './issue-tracker/issue-tracker.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';

import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule
  ],
  declarations: [
    ProjectComponent,
    WikiComponent,
    BoardsComponent,
    IssueTrackerComponent,
    ProjectSettingsComponent
  ]
})
export class ProjectModule {}