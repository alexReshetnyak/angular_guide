import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, tap, switchMap, mergeMap, withLatestFrom, flatMap, delay } from 'rxjs/operators';
import { from, timer } from 'rxjs';

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
    mergeMap(([action, storeState]) => {
      const userData: {
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      console.log('Auth effect, userData:', userData);

      const resetTokenAction = {
        type: AuthActions.AuthTypes.SET_TOKEN,
        payload: null
      };

      if (!userData) { return [resetTokenAction]; }

      if (userData._token) {
        return [
          {
            type: AuthActions.AuthTypes.SET_TOKEN,
            payload: userData._token
          },
          {
            type: AuthActions.AuthTypes.SET_TOKEN_EXPIRATION_DATE,
            payload: new Date(userData._tokenExpirationDate)
          },
          {
            type: AuthActions.AuthTypes.SIGNIN
          },
          {
            type: AuthActions.AuthTypes.AUTO_LOGOUT,
          },
        ];
      }
      return [resetTokenAction];
    })
  );

  @Effect()
  public authAutoLogout = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.AUTO_LOGOUT),
    withLatestFrom(this.store$),
    switchMap(([action, storeState]) => {
      console.log('Auth Effects, store:', storeState);
      // TODO const expirationDuration =
      // TODO new Date(storeState.auth.tokenExpirationDate).getTime() -
      // TODO new Date().getTime();

      // TODO Check Expiration Date validity
      if (action) {
        // TODO timer(expirationDuration)
        // return from(null).pipe(delay(500));
        return timer(5000);
      } else {
        return from(null);
      }
    }),
    mergeMap((actions) => {
      return [{
        type: AuthActions.AuthTypes.LOGOUT,
      }];
    }),
    tap(action => {
      localStorage.removeItem('userData');
      // TODO check if I should navigate to sign in
      this.router.navigate(['/signin']);
    })
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromApp.AppState>,
    private router: Router,
  ) {}
}
