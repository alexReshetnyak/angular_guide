import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { RecipesService } from '../services/recipes.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

interface recipeFormValue {
  name: string;
  imagePath: string;
  description: string;
  ingredients: FormArray
}

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  public recipeForm: FormGroup;

  private id: number;
  private editMode = false;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id       = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  public get ingredients(): FormArray {
    // return <FormArray>this.signupForm.get('hobbies');
    return this.recipeForm.get('ingredients') as FormArray;
  }

  public onSubmit(): void {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recipesService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipesService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  public onAddIngredient(): void {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':   new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  public onDeleteIngredient(index: number): void {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  public onCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm(): void {
    this.editMode ?
      this.initEditForm() :
      this.buildForm({
        name:         '',
        imagePath:    '',
        description:  '',
        ingredients:  new FormArray([])
      });
  }

  private initEditForm(): void {
    const recipe = this.recipesService.getRecipe(this.id);
    const ingredients = new FormArray([]);

    recipe['ingredients'] && recipe.ingredients.forEach((ingredient: Ingredient) => {
      ingredients.push(
        new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        })
      );
    });

    this.buildForm({
      name:         recipe.name,
      imagePath:    recipe.imagePath,
      description:  recipe.description,
      ingredients
    });
  }

  private buildForm(recipe: recipeFormValue): void {
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'ingredients': recipe.ingredients
    });
  }

}
