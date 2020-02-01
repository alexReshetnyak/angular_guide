import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/models/ingredient.model';

import * as RecipeActions from '../store/actions/recipe.actions';
import * as fromRecipe    from '../store/reducers/recipe.reducers';
import * as fromApp from '../../store/app.reducers';
import { Recipe } from '../models/recipe.model';

// TODO fix saving for new items

interface RecipeFormValue {
  name: string;
  imagePath: string;
  description: string;
  ingredients: FormArray;
}

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  public recipeForm: FormGroup;

  private id: number;
  private editMode = false;
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id       = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  public get ingredients(): FormArray {
    // return <FormArray>this.signupForm.get('hobbies');
    return this.recipeForm && this.recipeForm.get('ingredients') as FormArray;
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
      this.store.dispatch(new RecipeActions.AddRecipe(new Recipe(this.recipeForm.value)));
    }
    this.onCancel();
  }

  public onAddIngredient(): void {
    this.ingredientsFormArray.push(
      new FormGroup({
        name:   new FormControl(null, Validators.required),
        amount: new FormControl(null, [
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
    return this.recipeForm && this.recipeForm.get('ingredients') as FormArray;
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
    this.storeSub = this.store.select('recipes')
      .pipe(take(1))
      .subscribe((recipeState: fromRecipe.State) => {
        const recipe = recipeState.recipes[this.id];
        const ingredients = new FormArray([]);

        recipe.ingredients && recipe.ingredients.forEach((ingredient: Ingredient) => {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
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

  private buildForm(recipe: RecipeFormValue): void {
    this.recipeForm = new FormGroup({
      name: new FormControl(recipe.name, Validators.required),
      imagePath: new FormControl(recipe.imagePath, Validators.required),
      description: new FormControl(recipe.description, Validators.required),
      ingredients: recipe.ingredients
    });
  }

  ngOnDestroy() {
    this.storeSub && this.storeSub.unsubscribe();
  }

}
