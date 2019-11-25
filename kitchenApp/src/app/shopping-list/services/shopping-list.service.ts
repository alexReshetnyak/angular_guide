import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public ingredientsChanged: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  public addIngredients(ingredients: Ingredient[]): void {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
