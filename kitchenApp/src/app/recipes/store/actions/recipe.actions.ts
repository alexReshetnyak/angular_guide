import { Action } from '@ngrx/store';
import { Recipe } from '../../models/recipe.model';


export enum RecipeTypes {
  SET_RECIPES   = '[Recipe] Set Recipes',
  ADD_RECIPE    = '[Recipe] Add Recipe',
  UPDATE_RECIPE = '[Recipe] Update Recipe',
  DELETE_RECIPE = '[Recipe] Delete Recipe',
  STORE_RECIPES = '[Recipe] Store Recipes',
  FETCH_RECIPES = '[Recipe] Fetch Recipes',
}

export class SetRecipes implements Action {
  readonly type = RecipeTypes.SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
  readonly type = RecipeTypes.ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = RecipeTypes.UPDATE_RECIPE;

  constructor(public payload: {index: number, updatedRecipe: Recipe}) {}
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

export type RecipeActions = SetRecipes |
  AddRecipe |
  UpdateRecipe |
  DeleteRecipe |
  StoreRecipes |
  FetchRecipes;
