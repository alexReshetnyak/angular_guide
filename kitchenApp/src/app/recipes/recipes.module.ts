import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { StoreModule }          from '@ngrx/store';
import { EffectsModule }        from '@ngrx/effects';

import { RecipesComponent }       from './recipes.component';
import { RecipeListComponent }    from './recipe-list/recipe-list.component';
import { RecipeDetailComponent }  from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent }    from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent }   from './recipe-start/recipe-start.component';
import { RecipeEditComponent }    from './recipe-edit/recipe-edit.component';

import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule }         from '../shared/shared.module';

import { recipeReducer } from './store/reducers/recipe.reducers';
import { RecipeEffects } from './store/effects/recipe.effects';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducer),
    EffectsModule.forFeature([RecipeEffects])
  ]
})
export class RecipesModule {}
