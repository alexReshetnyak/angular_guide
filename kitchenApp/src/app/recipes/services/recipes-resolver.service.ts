import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

import { StateRecipe } from '../models/recipe.model';

import * as fromApp from '../../store/app.reducers';
import * as RecipeActions from '../store/actions/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<StateRecipe> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<StateRecipe> {
    const recipeIndex = route.params.id;

    return this.store.select('recipe').pipe(
      take(1),
      map(recipesState => recipesState.recipes),
      switchMap((recipes: StateRecipe[]) => {
        if (!recipes.length) {
          this.store.dispatch(new RecipeActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipeActions.RecipeTypes.SET_RECIPES),
            take(1),
            map((action: RecipeActions.SetRecipes) => action.payload),
          );
        } else {
          return of(recipes);
        }
      }),
      map((recipes: StateRecipe[]) => {
        const recipe = recipes[recipeIndex];
        return recipe;
      }),
    );
  }
}
