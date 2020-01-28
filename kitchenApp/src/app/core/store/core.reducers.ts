import * as CoreActions from './core.actions';

export interface State {
  loading: boolean;
  loadingStreamsCount: number;
  err: { moduleName: string, message: string };
}

const initialState: State = {
  loading: false,
  loadingStreamsCount: 0,
  err: null,
};

export function coreReducer(state = initialState, action: CoreActions.CoreActions) {
  switch (action.type) {
    case (CoreActions.CoreTypes.SET_ERROR):
      const errCopy = { ...state.err };
      return action.payload ? {
        ...state,
        err: {...errCopy, ...action.payload }
      } : {
        ...state,
        err: null,
      };
    case (CoreActions.CoreTypes.START_LOADING):
      return {
        ...state,
        loadingStreamsCount: state.loadingStreamsCount + 1,
        loading: true,
      };
    case (CoreActions.CoreTypes.STOP_LOADING):
      const currentStreamsCount = state.loadingStreamsCount - 1;
      return {
        ...state,
        loadingStreamsCount: currentStreamsCount <= 0 ? 0 : currentStreamsCount,
        loading: currentStreamsCount <= 0 ? false : true,
      };
    default:
      return state;
  }
}