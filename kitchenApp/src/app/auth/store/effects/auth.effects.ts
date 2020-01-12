import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, tap, switchMap, mergeMap } from 'rxjs/operators';
import { from, OperatorFunction } from 'rxjs';

import * as firebase from 'firebase/app';
import * as AuthActions from '../actions/auth.actions';

interface User {
  username: string;
  password: string;
}

@Injectable()
export class AuthEffects {
  @Effect()
  public authSignup = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.TRY_SIGNUP),
    map((action: AuthActions.TrySignup) => action.payload),
    switchMap((authData: User) => (
      from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password))
    )),
    switchMap(() => from(firebase.auth().currentUser.getIdToken())),
    mergeMap((token: string) => [
      {
        type: AuthActions.AuthTypes.SIGNUP
      },
      {
        type: AuthActions.AuthTypes.SET_TOKEN,
        payload: token
      }
    ])
  );

  @Effect()
  public authSignin = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.TRY_SIGNIN),
    map((action: AuthActions.TrySignup) => action.payload),
    switchMap((authData: User) => {
      return from(
        firebase.auth().signInWithEmailAndPassword(authData.username, authData.password)
      );
    }),
    switchMap(() => from(firebase.auth().currentUser.getIdToken())),
    mergeMap((token: string) => {
      console.log('Auth Effects token', token);
      return [
        {
          type: AuthActions.AuthTypes.SIGNIN
        },
        {
          type: AuthActions.AuthTypes.SET_TOKEN,
          payload: token
        }
      ];
    }),
    tap(action => {
      console.log('Action:', action);
      action.payload && this.router.navigate(['/']);
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.LOGOUT),
    tap(() => { this.router.navigate(['/']); })
  );

  constructor(
    private actions$: Actions,
    private router: Router
  ) {}
}
