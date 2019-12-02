import { Injectable, EventEmitter } from '@angular/core';

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


@Injectable()
export class RecipesService {
  public recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  private recipes: Recipe[] = mockRecipes;

  constructor(private shoppingListService: ShoppingListService) {}

  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  public getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }
}
