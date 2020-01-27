import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, switchMap, take, catchError } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducers';
import * as CoreActions from '../store/core.actions';

@Injectable({ providedIn: 'root' })
export class CoreService {
  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  /**
   *
   *
   *
   *
   *
  **/
  public handleLoading(stream$: Observable<any>, moduleName: string): Observable<any> {
    return of(null).pipe(
      tap(() => {
        console.log('Loading starts');
        this.store.dispatch(new CoreActions.StartLoading());
      }),
      switchMap(() => stream$),
      take(1),
      switchMap((result: any) => {
        console.log('Loading finish!');
        this.store.dispatch(new CoreActions.StopLoading());
        return of(result);
      }),
      // catchError((err) => {
      //   console.log('Handle loading Error:', err);
      //   // this.coreService.handleError(err, {moduleName: MODULE_NAME})
      //   const message = this.modifyErrorText(err)
      //   return of([
      //     new CoreActions.SetError({ moduleName, message: message}),
      //     new CoreActions.StopLoading(),
      //   ]);
      // }),
    );
  }

  public handleError(err: Error, {moduleName = 'core', cancelLoading = true} = {}): void {
    console.log('Core service, error:', err, moduleName, cancelLoading);
    const message = this.modifyErrorText(err)
    this.store.dispatch(new CoreActions.SetError({ moduleName, message: message}));
    cancelLoading && this.store.dispatch(new CoreActions.StopLoading());
  }

  private modifyErrorText(err): string {
    let errorMessage = 'An unknown error occurred!';
    const message = err.code;
    if (!message) { return errorMessage; }

    switch (message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'This password is not correct.';
        break;
    }
    return errorMessage;
  }
}
