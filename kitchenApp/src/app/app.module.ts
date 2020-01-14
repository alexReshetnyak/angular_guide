// * Augury - add for chrome to debug application

import { BrowserModule }                from '@angular/platform-browser';
import { NgModule }                     from '@angular/core';
import { HttpClientModule }             from '@angular/common/http';
import { StoreModule }                  from '@ngrx/store';
import { EffectsModule }                from '@ngrx/effects';
// import { StoreRouterConnectingModule }  from '@ngrx/router-store';

import { AuthModule }   from './auth/auth.module';
import { CoreModule }   from './core/core.module';
import { AppComponent } from './app.component';
import { AuthEffects }  from './auth/store/effects/auth.effects';
import { reducers }     from './store/app.reducers';

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
    EffectsModule.forRoot([AuthEffects]),
    // StoreRouterConnectingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
