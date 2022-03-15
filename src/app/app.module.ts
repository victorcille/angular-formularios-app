import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Importamos el client module para poder hacer peticiones http (lo usaremos para hacer una validación asíncrona de un campo email de un form)
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
