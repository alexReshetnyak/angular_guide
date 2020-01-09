
import { Ingredient } from 'src/app/shared/models/ingredient.model';

import { ShoppingListTypes, ShoppingListActions } from '../actions/shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state = initialState,
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
      // const ingredient = state.ingredients[state.editedIngredientIndex];
      const { payload: { index } } = action;
      const ingredient = state.ingredients[index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      // const ingredients = [...state.ingredients];
      // ingredients[state.editedIngredientIndex] = updatedIngredient;
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[index] = updatedIngredient;
      return {
        ...state,
        // ingredients,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListTypes.DELETE_INGREDIENT:
      // const oldIngredients = [...state.ingredients];
      // oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        // ingredients: oldIngredients,
        ingredients: state.ingredients.filter((ing, i) => i !== action.payload.index),
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
