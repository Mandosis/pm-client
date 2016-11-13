import { Injectable }     from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                         from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { ProjectService } from './project.service';


@Injectable()
export class ProjectGuard implements CanActivate {

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url = route.params['url'];
    return this.projectService.isAuthenticated(url)
      .map(result => {
        if (!result) {
          this.router.navigate(['404'], { skipLocationChange: true });
        }
        return result;
      })
      .catch(() => {
        this.router.navigate(['404'], { skipLocationChange: true });
        return Observable.of(false);
      });
    }
}
