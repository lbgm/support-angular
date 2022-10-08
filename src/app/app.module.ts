import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseInputComponent } from './base-input/base-input.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: Window, useValue: window}],
  bootstrap: [AppComponent]
})
export class AppModule { }
