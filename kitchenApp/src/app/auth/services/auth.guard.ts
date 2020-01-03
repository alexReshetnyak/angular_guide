import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, take } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../store/reducers/auth.reducers';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  public canActivate (
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: fromAuth.State) => authState.authenticated)
    );
  }
}
