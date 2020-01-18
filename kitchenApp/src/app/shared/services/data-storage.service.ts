import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { RecipesService } from 'src/app/recipes/services/recipes.service';
import { Recipe } from 'src/app/recipes/models/recipe.model';
import { CoreModule } from 'src/app/core/core.module';

import * as fromApp from '../../store/app.reducers';
import * as RecipeActions from '../../recipes/store/actions/recipe.actions';

const FIREBASE_URL = 'https://ng-kitchen-app.firebaseio.com';

@Injectable({ providedIn: CoreModule })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private store: Store<fromApp.AppState>,
  ) {}

  public storeRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(
        `${FIREBASE_URL}/recipes.json`,
        recipes
      )
      .subscribe(response => console.log(response));
  }

  public fetchRecipes(): Observable<any> {
    return this.http
      .get<Recipe[]>(
        `${FIREBASE_URL}/recipes.json`
      )
      .pipe(
        map(recipes => recipes.map(recipe => (
          {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          }
        ))),
        tap((recipes: Recipe[]) => {
          this.store.dispatch(new RecipeActions.SetRecipes(recipes));
        })
      );
  }
}
