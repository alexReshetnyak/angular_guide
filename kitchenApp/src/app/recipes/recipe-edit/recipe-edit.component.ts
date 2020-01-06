import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/models/ingredient.model';

import * as RecipeActions from '../store/actions/recipe.actions';
import * as fromRecipe    from '../store/reducers/recipe.reducers';

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
    private router: Router,
    private store: Store<fromRecipe.FeatureState>
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
    //   this.recipeForm.value['ingredients']
    // );
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({
        index: this.id,
        updatedRecipe: this.recipeForm.value
      }));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  public onAddIngredient(): void {
    this.ingredientsFormArray.push(
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
    this.ingredientsFormArray.removeAt(index);
  }

  public onCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private get ingredientsFormArray(): FormArray {
    return <FormArray>this.recipeForm.get('ingredients');
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
    this.store.select('recipes')
    .pipe(take(1))
    .subscribe((recipeState: fromRecipe.State) => {
      const recipe = recipeState.recipes[this.id];
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
