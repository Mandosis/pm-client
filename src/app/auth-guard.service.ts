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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.authService.redirectUrl = state.url;
    
    return this.authService.isAuthenticated()
      .map(result => {
        let canActivate = result;
        console.log(`canActivate: ${canActivate}`);
        
        if (!canActivate) {
          this.router.navigate(['/signin']);
        }

        return canActivate;
      })
      .catch(() => {
        this.router.navigate(['/signin']);
        return Observable.of(false);
      })
  }

}
