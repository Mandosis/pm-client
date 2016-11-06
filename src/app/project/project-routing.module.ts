import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ProjectHomeComponent }     from './project-home/project-home.component';
import { ProjectComponent }         from './project.component';
import { WikiComponent }            from './wiki/wiki.component';
import { IssueTrackerComponent }    from './issue-tracker/issue-tracker.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { BoardsComponent }          from './boards/boards.component';
import { CreateProjectComponent }   from './create-project/create-project.component';

// Guards
import { AuthGuard } from '../shared/auth/auth-guard.service';
import { ProjectGuard } from '../shared/project/project-guard.service';

const routes: Routes = [
  {
    path: 'project/:name',
    component: ProjectComponent,
    canActivate: [AuthGuard, ProjectGuard],
    children: [
      {
        path: '',
        component: ProjectHomeComponent
      },
      {
        path: 'docs',
        component: WikiComponent
      },
      {
        path: 'boards',
        component: BoardsComponent
      },
      {
        path: 'issues',
        component: IssueTrackerComponent
      },
      {
        path: 'settings',
        component: ProjectSettingsComponent
      }
    ]
  },
  {
    path: 'create/project',
    component: CreateProjectComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProjectRoutingModule { }
