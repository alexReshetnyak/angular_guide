import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, tap, switchMap, mergeMap, withLatestFrom } from 'rxjs/operators';
import { from } from 'rxjs';

import * as firebase from 'firebase/app';
import * as AuthActions from '../actions/auth.actions';
import * as fromApp from '../../../store/app.reducers';


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
      action.payload && this.router.navigate(['/']);
    })
  );

  @Effect({ dispatch: false })
  public authLogout = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.LOGOUT),
    tap(() => { this.router.navigate(['/']); })
  );


  @Effect()
  public authAutoLogin = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.AUTO_LOGIN),
    withLatestFrom(this.store$),
    map(([action, storeState]) => {
      const userData: {
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) { return; }

      if (userData._token) {
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        return [
          {
            type: AuthActions.AuthTypes.AUTO_LOGOUT,
            payload: expirationDuration,
          },
          {
            type: AuthActions.AuthTypes.SIGNIN
          },
          {
            type: AuthActions.AuthTypes.SET_TOKEN,
            payload: userData._token
          }
        ];
      }
    })
  );

  @Effect()
  public authAutoLogout = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.AUTO_LOGOUT),
    tap()
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromApp.AppState>,
    private router: Router,
  ) {}
}
