// * Augury - add for chrome to debug application

import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule }      from '@ngrx/store';

import { CoreModule }           from './core/core.module';
import { AppComponent }         from './app.component';
import { shoppingListReducer }  from './shopping-list/store/reducers/shopping-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
