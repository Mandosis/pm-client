import { Injectable }     from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                         from '@angular/router';
import { Observable }     from 'rxjs/Observable'
import { AuthService }    from '../auth/auth.service';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectGuard {

  constructor(
    private AuthService: AuthService,
    private projectService: ProjectService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Implement Guard

    console.log('Route:', route, '\nState:', state);

    return this.projectService.canActivate(route.params)
      .map(result => {
        let canActivate = result;

        if (!canActivate) {
          this.router.navigate(['/']);
        }

        return canActivate;
      })

  }

}
