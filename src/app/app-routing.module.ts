import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent }           from './login/login.component';
import { HomeComponent }            from './home/home.component';
import { ProjectRoutingModule }     from './project/project-routing.module';
import { NotFoundComponent }        from './not-found/not-found.component';

// Guards
import { AuthGuard } from './shared';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'project',
    pathMatch: 'full',
    loadChildren: './project/project.module#ProjectModule'
  },
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
