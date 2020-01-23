import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';

import { Recipe } from '../../models/recipe.model';
import { FIREBASE_URL } from 'src/app/secret';

import * as RecipeActions from '../actions/recipe.actions';
import * as fromRecipe    from '../reducers/recipe.reducers';


@Injectable()
export class RecipeEffects {
  @Effect()
  public fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.RecipeTypes.FETCH_RECIPES),
    switchMap((action: RecipeActions.FetchRecipes) => (
      this.httpClient.get<Recipe[]>(`${FIREBASE_URL}/recipes.json`, {
        observe: 'body',
        responseType: 'json'
      })
    )),
    map((recipes: Recipe[]) => {
      for (const recipe of recipes) {
        if (!recipe.ingredients) { recipe.ingredients = []; }
      }
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  public storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.RecipeTypes.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest(
        'PUT',
        `${FIREBASE_URL}/recipes.json`,
        state.recipes,
        { reportProgress: true }
      );
      return this.httpClient.request(req);
    }));

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>,
  ) {}
}
