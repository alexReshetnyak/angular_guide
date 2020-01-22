// * Augury - add for chrome to debug application

import { BrowserModule }                from '@angular/platform-browser';
import { NgModule }                     from '@angular/core';
import { HttpClientModule }             from '@angular/common/http';
import { StoreModule }                  from '@ngrx/store';
import { EffectsModule }                from '@ngrx/effects';
import { StoreDevtoolsModule }          from '@ngrx/store-devtools';
import { StoreRouterConnectingModule }  from '@ngrx/router-store';

import { AuthModule }   from './auth/auth.module';
import { CoreModule }   from './core/core.module';
import { AppComponent } from './app.component';
import { AuthEffects }  from './auth/store/effects/auth.effects';
import { RecipeEffects } from './recipes/store/effects/recipe.effects';
import { reducers }     from './store/app.reducers';
import { environment }  from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot(
      reducers,
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
