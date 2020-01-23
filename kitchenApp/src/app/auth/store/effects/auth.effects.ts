import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, tap, switchMap, mergeMap, withLatestFrom, catchError, delay, take, } from 'rxjs/operators';
import { from, of, } from 'rxjs';

import { StorageUser, AuthService } from '../../services/auth.service';
import { CoreService } from 'src/app/core/services/core.service';

import * as firebase from 'firebase/app';
import * as AuthActions from '../actions/auth.actions';
import * as fromApp from '../../../store/app.reducers';


// TODO Create async error interceptor somewhere in core service to catch an error and run spinner
// TODO this.coreService.handleAsyncAction({ module: 'auth', action: from(firebase.auth().currentUser.getIdToken()) })

const MODULE_NAME = 'auth';

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
          new AuthActions.SetToken(storageUser._token),
          new AuthActions.SetTokenExpirationDate(storageUser._tokenExpirationDate),
          new AuthActions.Signin(),
          new AuthActions.AutoLogout({ expiresIn, expirationDate: storageUser._tokenExpirationDate }),
          new AuthActions.NavigateAfterLogin(),
        ] :
        [{ type: 'DUMMY' }];
    }),
  );

  @Effect()
  public authSignin = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.TRY_SIGNIN),
    map((action: AuthActions.TrySignup) => action.payload),
    switchMap((authData: User) => this.coreService.handleLoading(from(
      firebase.auth().signInWithEmailAndPassword(authData.username, authData.password)
    ))),
    switchMap(() => this.coreService.handleLoading(from(
      firebase.auth().currentUser.getIdToken()
    ))),
    map((token: string) => {
      const storageUser: string = createDataForStorage(token);
      localStorage.setItem('userData', storageUser);
      return JSON.parse(storageUser) as StorageUser;
    }),
    mergeMap((storageUser: StorageUser) => {
      const expiresIn = this.authService.getUserExpirationTime(storageUser);
      return expiresIn && expiresIn > 0 ?
        [
          new AuthActions.SetToken(storageUser._token),
          new AuthActions.SetTokenExpirationDate(storageUser._tokenExpirationDate),
          new AuthActions.Signin(),
          new AuthActions.AutoLogout({ expiresIn, expirationDate: storageUser._tokenExpirationDate }),
          new AuthActions.NavigateAfterLogin(),
        ] :
        [{ type: 'DUMMY' }];
    }),
    catchError((err, caught) => {
      console.log('Firebase sign in error:', err);
      this.coreService.handleError(err, {moduleName: MODULE_NAME})
      return caught;
    })
  );

  @Effect({ dispatch: false }) // * effect which is does not dispatch an action
  public authNavigateAfterLogin = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.NAVIGATE_AFTER_LOGIN),
    tap(() => {
      // (this.router.url === '/signin' || this.router.url === '/signup') && this.router.navigate(['/']);
      this.router.navigate(['/']);
    })
  );

  @Effect()
  public tryLogout = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.TRY_LOGOUT),
    mergeMap(() => {
      return [
        new AuthActions.Logout(),
        new AuthActions.SetTokenExpirationDate(null),
        new AuthActions.NavigateAfterLogout(),
      ];
    }),
  );

  @Effect({ dispatch: false }) // * effect which is does not dispatch an action
  public authNavigateAfterLogout = this.actions$.pipe(
    ofType(AuthActions.AuthTypes.NAVIGATE_AFTER_LOGOUT),
    tap(() => {
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
      const expiresIn = this.authService.getUserExpirationTime(userData);
      console.log('Token expires in ms:', expiresIn, userData);
      return expiresIn && expiresIn > 0 ?
        [
          new AuthActions.SetToken(userData._token),
          new AuthActions.Signin(),
          new AuthActions.SetTokenExpirationDate(userData._tokenExpirationDate),
          new AuthActions.AutoLogout({ expiresIn, expirationDate: userData._tokenExpirationDate }),
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
        [new AuthActions.TryLogout()] :
        [{ type: 'DUMMY' }];
    }),
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromApp.AppState>,
    private router: Router,
    private authService: AuthService,
    private coreService: CoreService,
  ) {}
}
