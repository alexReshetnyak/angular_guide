import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input()   public recipe: Recipe;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
  }

  public onSelected() {
    this.recipesService.recipeSelected.emit(this.recipe);
  }

}
