import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../models/recipe.model';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() public recipe: Recipe;

  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
  }

  public onAddToShoppingList():void {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
