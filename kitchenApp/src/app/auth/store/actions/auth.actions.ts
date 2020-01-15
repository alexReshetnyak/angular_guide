import { Action } from '@ngrx/store';

interface User {
  username: string,
  password: string,
}

export enum AuthTypes {
  TRY_SIGNUP                = '[auth] Try Signup',
  TRY_SIGNIN                = '[auth] Try Signin',
  TRY_LOGOUT                = '[auth] Try Logout',
  LOGOUT                    = '[auth] Logout',
  SIGNUP                    = '[auth] Signup',
  SIGNIN                    = '[auth] Signin',
  SET_TOKEN                 = '[auth] Set Token',
  AUTO_LOGIN                = '[auth] Auto Login',
}

export class TrySignup implements Action {
  readonly type = AuthTypes.TRY_SIGNUP;

  constructor(public payload: User) {}
}

export class TrySignin implements Action {
  readonly type = AuthTypes.TRY_SIGNIN;

  constructor(public payload: User) {}
}

export class TryLogout implements Action {
  readonly type = AuthTypes.TRY_LOGOUT;
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

export class AutoLogin implements Action {
  readonly type = AuthTypes.AUTO_LOGIN;
}

export type AuthActions =
  TrySignup               |
  TrySignin               |
  TryLogout               |
  Signup                  |
  Signin                  |
  Logout                  |
  SetToken                |
  AutoLogin               ;
