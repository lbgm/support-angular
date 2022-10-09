import { forwardRef, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseInputComponent } from './base-input/base-input.component';
import { BaseButtonComponent } from './base-button/base-button.component';
import { BaseCheckboxComponent } from './base-checkbox/base-checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseInputComponent,
    BaseButtonComponent,
    BaseCheckboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: Window,
      useValue: window
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
