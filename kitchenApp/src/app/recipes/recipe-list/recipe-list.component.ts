import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRecipe from '../store/reducers/recipe.reducers';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  public recipeState: Observable<fromRecipe.State>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRecipe.FeatureState>
  ) {}

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }

  public onNewRecipe(): void {
    this.router.navigate(['./new'], { relativeTo: this.route });
  }

}
