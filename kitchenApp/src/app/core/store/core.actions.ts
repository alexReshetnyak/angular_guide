import { Action } from '@ngrx/store';

export enum CoreTypes {
  SET_ERROR     = '[core] Set error',
  START_LOADING = '[core] Start loading',
  STOP_LOADING  = '[core] Stop loading',
}

export class SetError implements Action {
  readonly type = CoreTypes.SET_ERROR;

  constructor(public payload: { moduleName: string, message: string }) {}
}

export class StartLoading implements Action {
  readonly type = CoreTypes.START_LOADING;
}

export class StopLoading implements Action {
  readonly type = CoreTypes.STOP_LOADING;
}

export type CoreActions = SetError | StartLoading | StopLoading;
