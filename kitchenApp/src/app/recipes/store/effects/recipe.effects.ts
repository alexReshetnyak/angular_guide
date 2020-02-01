import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/database';

import { Recipe } from '../../models/recipe.model';
import { CoreService } from 'src/app/core/services/core.service';
import { FIREBASE_URL } from 'src/app/secret';

import * as RecipeActions from '../actions/recipe.actions';
import * as fromRecipe    from '../reducers/recipe.reducers';

const MODULE_NAME = 'recipes';

@Injectable()
export class RecipeEffects {
  @Effect()
  public fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.RecipeTypes.FETCH_RECIPES),
    switchMap((action: RecipeActions.FetchRecipes) => {
      const req = this.httpClient.get<Recipe[]>(`${FIREBASE_URL}/recipes.json`, {
        observe: 'body',
        responseType: 'json'
      });
      return this.coreService.handleLoading(req, MODULE_NAME);
    }),
    map((recipes: Recipe[]) => (recipes || []).map(recipe => {
      return new Recipe(recipe);
    })),
    map((recipes: Recipe[]) => {
      recipes.forEach(recipe => {
        !recipe.ingredients && (recipe.ingredients = []);
      });
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  public storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.RecipeTypes.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    map(([action, state]) => state.recipes.map(recipe => recipe.attr)),
    switchMap(recipes => {
      const db = firebase.database();
      const req = db.ref('recipes').set(recipes);
      return this.coreService.handleLoading(
        of(req),
        MODULE_NAME,
      );
    }));

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>,
    private coreService: CoreService,
  ) {}
}
