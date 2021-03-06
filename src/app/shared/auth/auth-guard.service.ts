import { Injectable }       from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { Observable }       from 'rxjs';
import { AuthService }      from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    let url: string = state.url;

    return this.checkLogin(url);

  }

  checkLogin(url: string): boolean {
    if (this.authService.isAuthenticated) {
      return true;
    }

    this.authService.redirectUrl = url;

    this.router.navigate(['/signin']);
    return false;
  }

}
