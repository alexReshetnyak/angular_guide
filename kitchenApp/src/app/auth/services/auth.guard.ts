import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../store/reducers/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: fromAuth.State) => {
        this.router.navigate(['/signin']);
        return authState && authState.authenticated;
      })
    );
  }
}
