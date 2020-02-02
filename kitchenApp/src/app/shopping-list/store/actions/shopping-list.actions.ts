import { Action } from '@ngrx/store';

import { StateIngredient } from 'src/app/shared/models/ingredient.model';

export enum ShoppingListTypes {
  ADD_INGREDIENT     = '[Shopping List] Add Ingredient',
  ADD_INGREDIENTS    = '[Shopping List] Add Ingredients',
  UPDATE_INGREDIENT  = '[Shopping List] Update Ingredient',
  DELETE_INGREDIENT  = '[Shopping List] Delete Ingredient',
  START_EDIT         = '[Shopping List] Start edit',
  STOP_EDIT          = '[Shopping List] Stop edit',
}

export class AddIngredient implements Action {
  readonly type = ShoppingListTypes.ADD_INGREDIENT;

  constructor(public payload: StateIngredient) {}
}

export class AddIngredients implements Action {
  readonly type = ShoppingListTypes.ADD_INGREDIENTS;

  constructor(public payload: StateIngredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = ShoppingListTypes.UPDATE_INGREDIENT;

  constructor(public payload: StateIngredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = ShoppingListTypes.DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = ShoppingListTypes.START_EDIT;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = ShoppingListTypes.STOP_EDIT;
}

export type ShoppingListActions =
  AddIngredient     |
  AddIngredients    |
  UpdateIngredient  |
  DeleteIngredient  |
  StartEdit         |
  StopEdit;
