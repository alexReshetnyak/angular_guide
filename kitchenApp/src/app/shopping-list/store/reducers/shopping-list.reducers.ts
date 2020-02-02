
import { StateIngredient } from 'src/app/shared/models/ingredient.model';

import { ShoppingListTypes, ShoppingListActions } from '../actions/shopping-list.actions';

import * as fromApp from '../../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  ingredients: StateIngredient[];
  editedIngredient: StateIngredient;
  editedIngredientIndex: number;
}

export interface State {
  ingredients: StateIngredient[];
  editedIngredient: StateIngredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListTypes.UPDATE_INGREDIENT:
      const updatedIngredient = action.payload;
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListTypes.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListTypes.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient,
        editedIngredientIndex: action.payload
      };

    case ShoppingListTypes.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
