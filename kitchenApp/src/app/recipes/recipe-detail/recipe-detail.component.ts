import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take, map, switchMap, tap } from 'rxjs/operators';

import { Recipe } from '../models/recipe.model';

import * as ShoppingListActions from '../../shopping-list/store/actions/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';
import * as fromRecipe from '../store/reducers/recipe.reducers';
import * as RecipeActions from '../store/actions/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  public id: number;
  public recipeState: Observable<Recipe>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    this.route.params.pipe(
      tap((params: Params) => { this.id = +params.id; }),
      switchMap(() => this.route.data),
      map((data: Data) => data.recipe ),
    ).subscribe((recipe: Recipe) => {
      this.recipeState = of(recipe);
    });
  }

  public onAddToShoppingList() {
    this.store.select('recipes')
      .pipe(take(1))
      .subscribe((recipeState: fromRecipe.State) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(
          recipeState.recipes[this.id].ingredients)
        );
      });
  }

  public onEditRecipe(): void {
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  public onDeleteRecipe(): void {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
