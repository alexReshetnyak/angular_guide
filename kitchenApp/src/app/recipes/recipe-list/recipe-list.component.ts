import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Recipe } from '../models/recipe.model';

import * as fromApp from '../../store/app.reducers';
import * as RecipeActions from '../store/actions/recipe.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[];

  private firstLoad = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.select('recipes').pipe(
      map(recipeState => recipeState.recipes),
    ).subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      if ((!recipes || !recipes.length) && this.firstLoad) {
        this.store.dispatch(new RecipeActions.FetchRecipes());
      }
      this.firstLoad = false;
    });
  }

  public onNewRecipe(): void {
    this.router.navigate(['./new'], { relativeTo: this.route });
  }

}
