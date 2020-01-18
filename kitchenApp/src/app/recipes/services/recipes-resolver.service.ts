import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from '../models/recipe.model';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Observable } from 'rxjs';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipesService,
  ) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Recipe[] {
    const recipes = this.recipesService.getRecipes();
    return recipes.length ? recipes : this.dataStorageService.fetchRecipes();
  }
}
