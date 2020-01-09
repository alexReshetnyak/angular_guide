import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model'
import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';
import { CoreModule } from 'src/app/core/core.module';

import * as shoppingListActions from '../../shopping-list/store/actions/shopping-list.actions';

@Injectable({
  providedIn: CoreModule
})
export class RecipesService {
  public recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>,
  ) {}

  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  public getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  public addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  public updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next([...this.recipes]);
  }

  public deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  public setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.store.dispatch(new shoppingListActions.AddIngredients(ingredients));
  }

}
