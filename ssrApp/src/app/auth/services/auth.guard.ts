import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../store/reducers/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId, // * Store global ID of current platform in this property (SSR)
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot,
  ): Observable<boolean> {
    // * SSR logic
    if (isPlatformServer(this.platformId)) {
      return of(true);
    }

    return this.store.select('auth').pipe(
      take(1),
      map((authState: fromAuth.State) => {
        if (!authState || !authState.authenticated) {
          console.log('Auth guard navigate to Sign in');
          this.router.navigate(['/signin']);
        }
        return authState && authState.authenticated;
      })
    );
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
