import { StateRecipe } from '../../models/recipe.model';

import * as RecipeActions from '../actions/recipe.actions';
import * as fromApp       from '../../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: StateRecipe[];
}

export interface State {
  recipes: StateRecipe[];
}

const initialState: State = { recipes: [] };

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case (RecipeActions.RecipeTypes.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };

    case (RecipeActions.RecipeTypes.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

      case (RecipeActions.RecipeTypes.UPDATE_RECIPE):
      const { updatedRecipe } = action.payload;
      console.log('Recipe reducer, recipe:', updatedRecipe);

      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return { ...state, recipes };

    case (RecipeActions.RecipeTypes.DELETE_RECIPE):
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
