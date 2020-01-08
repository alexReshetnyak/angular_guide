import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/reducers/shopping-list.reducers';
import * as fromAuth from '../auth/store/reducers/auth.reducers';

export interface AppState {
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
