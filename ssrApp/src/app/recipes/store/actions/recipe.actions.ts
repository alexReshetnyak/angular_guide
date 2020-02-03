import { Action } from '@ngrx/store';
import { StateRecipe } from '../../models/recipe.model';


export enum RecipeTypes {
  SET_RECIPES   = '[Recipes] Set Recipes',
  ADD_RECIPE    = '[Recipes] Add Recipe',
  UPDATE_RECIPE = '[Recipes] Update Recipe',
  DELETE_RECIPE = '[Recipes] Delete Recipe',
  STORE_RECIPES = '[Recipes] Store Recipes',
  FETCH_RECIPES = '[Recipes] Fetch Recipes',
}

export class SetRecipes implements Action {
  readonly type = RecipeTypes.SET_RECIPES;

  constructor(public payload: StateRecipe[]) {}
}

export class AddRecipe implements Action {
  readonly type = RecipeTypes.ADD_RECIPE;

  constructor(public payload: StateRecipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = RecipeTypes.UPDATE_RECIPE;

  constructor(public payload: {index: number, updatedRecipe: StateRecipe}) {}
}

export class DeleteRecipe implements Action {
  readonly type = RecipeTypes.DELETE_RECIPE;

  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
  readonly type = RecipeTypes.STORE_RECIPES;
}

export class FetchRecipes implements Action {
  readonly type = RecipeTypes.FETCH_RECIPES;
}

export type RecipeActions =
  SetRecipes   |
  AddRecipe    |
  UpdateRecipe |
  DeleteRecipe |
  StoreRecipes |
  FetchRecipes ;
