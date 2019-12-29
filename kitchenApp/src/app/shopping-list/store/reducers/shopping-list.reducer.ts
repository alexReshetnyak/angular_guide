import { Action } from '@ngrx/store';

import { Ingredient }     from 'src/app/shared/models/ingredient.model';
import { ADD_INGREDIENT } from '../actions/shopping-list.action';

const initialState = {
	ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(
  state = initialState,
  action: Action
): { [name: string]: any } {
	switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action]
      };

    default:
      break;
  }
}
