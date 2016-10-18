import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ProjectComponent }         from './project/project.component';
import { LoginComponent }           from './login/login.component';
import { HomeComponent }            from './home/home.component';
import { WikiComponent }            from './wiki/wiki.component';
import { IssueTrackerComponent }    from './issue-tracker/issue-tracker.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { BoardsComponent }          from './boards/boards.component';

const routes: Routes = [
  {
    path: 'project/:name',
    component: ProjectComponent,
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
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
