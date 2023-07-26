import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';

import { GlobalFacade } from '@store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public globalFacade: GlobalFacade) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.globalFacade.isLoggedIn$.pipe(
      take(1),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
        }
      }),
    );
  }
}
