import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, tap, switchMap, mergeMap, withLatestFrom, catchError, delay, } from 'rxjs/operators';
import { from, of, } from 'rxjs';

import { StorageUser, AuthService } from '../../services/auth.service';

import * as firebase from 'firebase/app';
import * as AuthActions from '../actions/auth.actions';
import * as fromApp from '../../../store/app.reducers';


// TODO Create async error interceptor somewhere in core service to catch an error and run spinner
// TODO this.coreService.handleAsyncAction({ module: 'auth', action: from(firebase.auth().currentUser.getIdToken()) })

interface User {
  username: string;
  password: string;
}

const createDataForStorage = (token: string): string => {
  const expirationDate = new Date(new Date().getTime() + 60 * 59 * 1000);
  const userAuthData = {
    _token: token,
    _tokenExpirationDate: expirationDate
  };
  return JSON.stringify(userAuthData);
};


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
    map((token: string) => {
      const storageUser: string = createDataForStorage(token);
      localStorage.setItem('userData', storageUser);
      return JSON.parse(storageUser) as StorageUser;
    }),
    mergeMap((storageUser: StorageUser) => {
      const expiresIn = this.authService.getUserExpirationTime(storageUser);
      return expiresIn && expiresIn > 0 ?
        [
          {
            type: AuthActions.AuthTypes.SET_TOKEN,
            payload: storageUser._token
          },
          {
            type: AuthActions.AuthTypes.SET_TOKEN_EXPIRATION_DATE,
            payload: storageUser._tokenExpirationDate
          },
          {
            type: AuthActions.AuthTypes.SIGNIN
          },
          {
            type: AuthActions.AuthTypes.AUTO_LOGOUT,
            payload: { expiresIn, expirationDate: storageUser._tokenExpirationDate }
          },
          { type: AuthActions.AuthTypes.NAVIGATE_AFTER_LOGIN },
        ] :
        [{ type: 'DUMMY' }];
    }),
  );

  @Effect()
  public authSignin = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.TRY_SIGNIN),
    map((action: AuthActions.TrySignup) => action.payload),
    switchMap((authData: User) => from(
      firebase.auth().signInWithEmailAndPassword(authData.username, authData.password)
    )),
    switchMap(() => from(firebase.auth().currentUser.getIdToken())),
    map((token: string) => {
      const storageUser: string = createDataForStorage(token);
      localStorage.setItem('userData', storageUser);
      return JSON.parse(storageUser) as StorageUser;
    }),
    mergeMap((storageUser: StorageUser) => {
      const expiresIn = this.authService.getUserExpirationTime(storageUser);
      return expiresIn && expiresIn > 0 ?
        [
          {
            type: AuthActions.AuthTypes.SET_TOKEN,
            payload: storageUser._token
          },
          {
            type: AuthActions.AuthTypes.SET_TOKEN_EXPIRATION_DATE,
            payload: storageUser._tokenExpirationDate
          },
          {
            type: AuthActions.AuthTypes.SIGNIN
          },
          {
            type: AuthActions.AuthTypes.AUTO_LOGOUT,
            payload: { expiresIn, expirationDate: storageUser._tokenExpirationDate }
          },
          { type: AuthActions.AuthTypes.NAVIGATE_AFTER_LOGIN },
        ] :
        [{ type: 'DUMMY' }];
    }),
    // tap(action => { console.log('Tap after sign in, action:', action); }),
    catchError((err, caught) => {
      console.log('Firebase sign in error:', err);
      // * this.store.dispatch(new CoreActions.SetNewError(err));
      return caught;
    })
  );

  @Effect({ dispatch: false }) // * effect which is does not dispatch an action
  public authNavigateAfterLogin = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.NAVIGATE_AFTER_LOGIN),
    tap(() => {
      console.log('Navigate after login/sign up:', this.router.url);
      // (this.router.url === '/signin' || this.router.url === '/signup') && this.router.navigate(['/']);
      this.router.navigate(['/']);
    })
  );

  @Effect()
  public tryLogout = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.TRY_LOGOUT),
    mergeMap(() => {
      return [
        { type: AuthActions.AuthTypes.LOGOUT },
        {
          type: AuthActions.AuthTypes.SET_TOKEN_EXPIRATION_DATE,
          payload: null
        },
        { type: AuthActions.AuthTypes.NAVIGATE_AFTER_LOGOUT }
      ];
    }),
  );

  @Effect({ dispatch: false }) // * effect which is does not dispatch an action
  public authNavigateAfterLogout = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.NAVIGATE_AFTER_LOGOUT),
    tap(() => {
      console.log('Navigate after logout');
      localStorage.removeItem('userData');
      this.router.navigate(['/signin']);
    })
  );

  @Effect()
  public authAutoLogin = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.AUTO_LOGIN),
    withLatestFrom(this.store$),
    map(([action, storeState]) => JSON.parse(localStorage.getItem('userData')) as StorageUser),
    mergeMap((userData: StorageUser) => {
      // TODO remove ? statement
      const expiresIn = this.authService.getUserExpirationTime(userData);
      console.log('Token expires in ms:', expiresIn, userData);
      return expiresIn && expiresIn > 0 ?
        [
          {
            type: AuthActions.AuthTypes.SET_TOKEN,
            payload: userData._token
          },
          {
            type: AuthActions.AuthTypes.SIGNIN
          },
          {
            type: AuthActions.AuthTypes.SET_TOKEN_EXPIRATION_DATE,
            payload: userData._tokenExpirationDate
          },
          {
            type: AuthActions.AuthTypes.AUTO_LOGOUT,
            payload: { expiresIn, expirationDate: userData._tokenExpirationDate }
          },
        ] :
        [{ type: 'DUMMY' }];
    })
  );

  @Effect()
  public authAutoLogout = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.AUTO_LOGOUT),
    map((action: AuthActions.AutoLogout) => action.payload),
    switchMap(({expiresIn, expirationDate}) => of(expirationDate).pipe(delay(expiresIn))),
    withLatestFrom(this.store$),
    mergeMap(([expirationDate, store]) => {
      console.log('Auto logout:', expirationDate, store.auth.tokenExpirationDate);
      return store.auth.tokenExpirationDate === expirationDate ?
        [{ type: AuthActions.AuthTypes.TRY_LOGOUT }] :
        [{ type: 'DUMMY' }];
    }),
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromApp.AppState>,
    private router: Router,
    private authService: AuthService,
  ) {}
}
