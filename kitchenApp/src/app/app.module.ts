// * Augury - add for chrome to debug application

import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule }      from '@ngrx/store';
import { EffectsModule }    from '@ngrx/effects';

import { CoreModule }           from './core/core.module';
import { AppComponent }         from './app.component';
import { shoppingListReducer }  from './shopping-list/store/reducers/shopping-list.reducers';
import { AuthEffects }          from './auth/store/effects/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer }),
    EffectsModule.forRoot([AuthEffects]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
