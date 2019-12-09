import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Ingredient } from '../../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public startedEditing = new Subject<number>();

  private _ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  public getIngredients():Ingredient[] {
    return this.ingredients.slice();
  }

  public getIngredient(index: number):Ingredient {
    return this.ingredients[index];
  }

  public addIngredient(ingredient: Ingredient):void {
    this.ingredients.push(ingredient);
    this._ingredientsChanged.next(this.ingredients.slice());
  }

  public updateIngredient(index: number, newIngredient: Ingredient):void {
    this.ingredients[index] = newIngredient;
    this.setIngredientsChanged(this.ingredients.slice());
  }

  public deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.setIngredientsChanged([...this.ingredients]);
  }

  public addIngredients(ingredients: Ingredient[]):void {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this._ingredientsChanged.next(this.ingredients.slice());
  }

  public setIngredientsChanged(ingredients: Ingredient[]):void {
    this._ingredientsChanged.next(ingredients);
  }

  public ingredientsChanged(): Observable<Ingredient[]> {
    return this._ingredientsChanged.asObservable();
  }

}
