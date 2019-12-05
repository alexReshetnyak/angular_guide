import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Ingredient } from '../../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private _ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this._ingredientsChanged.next(this.ingredients.slice());
  }

  public addIngredients(ingredients: Ingredient[]): void {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this._ingredientsChanged.next(this.ingredients.slice());
  }

  public setIngredientsChanged(ingredients: Ingredient[]): void {
    this._ingredientsChanged.next(ingredients);
  }

  public ingredientsChanged(): Observable<Ingredient[]> {
    return this._ingredientsChanged.asObservable();
  }


}
