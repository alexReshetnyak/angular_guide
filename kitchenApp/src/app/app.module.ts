// * Augury - add for chrome to debug application

import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }           from './app.component';
import { HeaderComponent }        from './header/header.component';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
// import { AlertComponent }           from './shared/components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
  ],
  // entryComponents: [ // * for dynamic components
  //   AlertComponent
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
