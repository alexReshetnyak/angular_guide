import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';

import { Recipe } from './models/recipe.model';
import { RecipesService } from './services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipesService]
})
export class RecipesComponent implements OnInit {
  public selectedRecipe: Recipe;

  constructor(
    // private recipesService: RecipesService
  ) { }

  ngOnInit() {
    // this.subscription = this.recipesService.getRecipeSelected().subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // });
  }
}
