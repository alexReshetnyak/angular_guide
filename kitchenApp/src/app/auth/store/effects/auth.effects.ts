import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, tap, switchMap, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

import * as firebase from 'firebase/app';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  public authSignup = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.TRY_SIGNUP),
    map((action: AuthActions.TrySignup) => action.payload),
    switchMap((authData: { username: string, password: string }) => (
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
    switchMap((authData: { username: string, password: string }) => {
      return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    }),
    switchMap(() => from(firebase.auth().currentUser.getIdToken())),
    mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.AuthTypes.SIGNIN
        },
        {
          type: AuthActions.AuthTypes.SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.LOGOUT),
    tap(() => { this.router.navigate(['/']); })
  );

  constructor(
    private actions$: Actions,
    private router: Router) {}
}
