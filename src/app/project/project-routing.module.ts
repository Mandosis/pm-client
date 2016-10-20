import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent }            from '../home/home.component';
import { ProjectComponent }         from './project.component';
import { WikiComponent }            from './wiki/wiki.component';
import { IssueTrackerComponent }    from './issue-tracker/issue-tracker.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { BoardsComponent }          from './boards/boards.component';

// Guards
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
    path: 'project/:name',
    component: ProjectComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProjectRoutingModule { }
