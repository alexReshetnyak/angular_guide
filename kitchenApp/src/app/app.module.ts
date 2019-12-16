// * Augury - add for chrome to debug application

import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }           from './app.component';
import { HeaderComponent }        from './header/header.component';
import { RecipesComponent }       from './recipes/recipes.component';
import { RecipeDetailComponent }  from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent }    from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent }    from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent }  from './shopping-list/shopping-list.component';
import { ShoppingEditComponent }  from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeEditComponent }    from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent }   from './recipes/recipe-start/recipe-start.component';

import { DropdownDirective } from './shared/directives/dropdown/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeEditComponent,
    RecipeStartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
