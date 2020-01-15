import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, tap, switchMap, mergeMap, withLatestFrom, catchError, } from 'rxjs/operators';
import { from, of, } from 'rxjs';

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
    mergeMap((token: string) => {
      localStorage.setItem('userData', JSON.stringify({ _token: token }));
      return [
        {
          type: AuthActions.AuthTypes.SIGNUP
        },
        {
          type: AuthActions.AuthTypes.SET_TOKEN,
          payload: token
        }
      ]
    }),
    tap(action => {
      action.payload && this.router.navigate(['/']);
    })
  );

  @Effect()
  public authSignin = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.TRY_SIGNIN),
    map((action: AuthActions.TrySignup) => action.payload),
    switchMap((authData: User) => {
      return from(
        firebase.auth().signInWithEmailAndPassword(authData.username, authData.password)
      )
    }),
    switchMap(() => from(firebase.auth().currentUser.getIdToken())),
    mergeMap((token: string) => {
      localStorage.setItem('userData', JSON.stringify({ _token: token }));
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
    }),
    catchError(err => {
      console.log('Firebase sign in error:', err);
      return of();
    })
  );

  // @Effect({ dispatch: false })
  // public authLogout = this.actions$.pipe(
  //   ofType(AuthActions.AuthTypes.LOGOUT),
  //   tap(() => {
  //     localStorage.removeItem('userData');
  //     this.router.navigate(['/']);
  //   })
  // );

  @Effect()
  public tryLogout = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.TRY_LOGOUT),
    mergeMap(() => [{ type: AuthActions.AuthTypes.LOGOUT }]),
    tap(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/signin']);
    })
  );

  @Effect()
  public authAutoLogin = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.AUTO_LOGIN),
    withLatestFrom(this.store$),
    map(([action, storeState]) => JSON.parse(localStorage.getItem('userData')) as { _token: string}),
    mergeMap((userData: {_token: string}) => {
      const token = userData ? userData._token : null;
      return token ?
        [
          {
            type: AuthActions.AuthTypes.SET_TOKEN,
            payload: token
          },
          {
            type: AuthActions.AuthTypes.SIGNIN
          },
        ] :
        [{
          type: AuthActions.AuthTypes.SET_TOKEN,
          payload: null
        }];
    })
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromApp.AppState>,
    private router: Router,
  ) {}
}
