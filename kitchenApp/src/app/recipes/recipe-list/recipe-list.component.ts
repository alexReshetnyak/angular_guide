import { Component, OnInit } from '@angular/core';

import { Recipe } from '../models/recipe.model';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[];

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
  }

}
