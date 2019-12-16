import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model'
import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';

const mockRecipes = [
  new Recipe(
    'Tasty Schnitzel',
    'A super-tasty Schnitzel - just awesome!',
    'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    [
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)
    ]),
  new Recipe('Big Fat Burger',
    'What else you need to say?',
    'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    [
      new Ingredient('Buns', 2),
      new Ingredient('Meat', 1)
    ])
];


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  public recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = mockRecipes;

  constructor(
    private shoppingListService: ShoppingListService
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
    this.shoppingListService.addIngredients(ingredients);
  }

}
