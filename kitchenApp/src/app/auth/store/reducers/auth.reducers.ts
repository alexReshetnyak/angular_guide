import * as AuthActions from '../actions/auth.actions';

export interface State {
  token: string;
  tokenExpirationDate: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  tokenExpirationDate: null,
  authenticated: false,
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.AuthTypes.SIGNUP):
    case (AuthActions.AuthTypes.SIGNIN):
      return {
        ...state,
        authenticated: true
      };
    case (AuthActions.AuthTypes.LOGOUT):
      return {
        ...state,
        token: null,
        authenticated: false,
      };
    case (AuthActions.AuthTypes.SET_TOKEN):
      return {
        ...state,
        token: action.payload
      };
    case (AuthActions.AuthTypes.SET_TOKEN_EXPIRATION_DATE):
      return {
        ...state,
        tokenExpirationDate: action.payload
      };
    default:
      return state;
  }
}
