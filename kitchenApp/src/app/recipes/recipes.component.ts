import { Component, OnInit } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: []
})
export class RecipesComponent implements OnInit {
  public recipes: Recipe[];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => console.log('recipes component, route data:', data))
  }
}
