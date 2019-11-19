import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HeaderComponent } from '../../components/commons/header/header.component';
import { FooterComponent } from '../../components/commons/footer/footer.component';
import { SubscribeComponent } from '../../components/commons/subscribe/subscribe.component';

import { MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { TestComponent } from './test/test.component';





@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SubscribeComponent,
    TestComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SubscribeComponent,
    TestComponent
  ],
  providers: [],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class CommonsModule { }
