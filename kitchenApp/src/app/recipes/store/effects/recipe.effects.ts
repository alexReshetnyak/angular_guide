import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';

import { Recipe } from '../../models/recipe.model';

import * as RecipeActions from '../actions/recipe.actions';
import * as fromRecipe    from '../reducers/recipe.reducers';

const FIREBASE_URL = 'https://ng-kitchen-app.firebaseio.com';

@Injectable()
export class RecipeEffects {
  @Effect()
  public recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap((action: RecipeActions.FetchRecipes) => (
      this.httpClient.get<Recipe[]>(`${FIREBASE_URL}/recipes.json`, {
        observe: 'body',
        responseType: 'json'
      })
    )),
    map((recipes) => {
      console.log(recipes);
      for (let recipe of recipes) {
        if (!recipe['ingredients']) { recipe['ingredients'] = []; }
      }
      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    })
  );

  @Effect({dispatch: false})
  public recipeStore = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
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
