import { Action } from '@ngrx/store';

interface User {
  username: string,
  password: string,
}

export enum AuthTypes {
  TRY_SIGNUP                = 'TRY_SIGNUP',
  SIGNUP                    = 'SIGNUP',
  TRY_SIGNIN                = 'TRY_SIGNIN',
  SIGNIN                    = 'SIGNIN',
  LOGOUT                    = 'LOGOUT',
  SET_TOKEN                 = 'SET_TOKEN',
  SET_TOKEN_EXPIRATION_DATE = 'SET_TOKEN_EXPIRATION_DATE',
  AUTO_LOGIN                = 'AUTO_LOGIN',
}

export class TrySignup implements Action {
  readonly type = AuthTypes.TRY_SIGNUP;

  constructor(public payload: User) {}
}

export class TrySignin implements Action {
  readonly type = AuthTypes.TRY_SIGNIN;

  constructor(public payload: User) {}
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

export class SetTokenExpirationDate implements Action {
  readonly type = AuthTypes.SET_TOKEN_EXPIRATION_DATE;

  constructor(public payload: Date) {}
}

export class AutoLogin implements Action {
  readonly type = AuthTypes.AUTO_LOGIN;
}

export type AuthActions =
  TrySignup               |
  TrySignin               |
  Signup                  |
  Signin                  |
  Logout                  |
  SetToken                |
  SetTokenExpirationDate  |
  AutoLogin               ;
