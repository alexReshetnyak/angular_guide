// * Augury - add for chrome to debug application

import { BrowserModule }                from '@angular/platform-browser';
import { NgModule }                     from '@angular/core';
import { HttpClientModule }             from '@angular/common/http';
import { StoreModule }                  from '@ngrx/store';
import { EffectsModule }                from '@ngrx/effects';
import { StoreRouterConnectingModule }  from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthModule }   from './auth/auth.module';
import { CoreModule }   from './core/core.module';
import { AppComponent } from './app.component';
import { AuthEffects }  from './auth/store/effects/auth.effects';
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
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
