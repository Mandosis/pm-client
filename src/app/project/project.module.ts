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

import { ProjectService } from '../shared/project/project.service';

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
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectModule {}