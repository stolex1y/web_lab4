import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth';
import {of} from 'rxjs/observable/of';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      return of(true);
    }
    else {
      this.router.navigate(["/auth"], {
        queryParams: {
          accessDenied: true
        },
      })
      return of(false);
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

}
