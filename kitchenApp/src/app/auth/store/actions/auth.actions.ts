import { Action } from '@ngrx/store';

export enum AuthTypes {
  TRY_SIGNUP = 'TRY_SIGNUP',
  SIGNUP     = 'SIGNUP',
  TRY_SIGNIN = 'TRY_SIGNIN',
  SIGNIN     = 'SIGNIN',
  LOGOUT     = 'LOGOUT',
  SET_TOKEN  = 'SET_TOKEN',
}

export class TrySignup implements Action {
  readonly type = AuthTypes.TRY_SIGNUP;

  constructor(public payload: {username: string, password: string}) {}
}

export class TrySignin implements Action {
  readonly type = AuthTypes.TRY_SIGNIN;

  constructor(public payload: {username: string, password: string}) {}
}

export class Signup implements Action {
  readonly type = AuthTypes.SIGNUP;
}

export class Signin implements Action {
  readonly type = AuthTypes.SIGNIN;
}

export class Logout implements Action {
  readonly type = AuthTypes.LOGOUT;
}

export class SetToken implements Action {
  readonly type = AuthTypes.SET_TOKEN;

  constructor(public payload: string) {}
}

export type AuthActions = Signup | Signin | Logout | SetToken | TrySignup | TrySignin;
