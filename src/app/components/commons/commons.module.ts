import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from '../../components/commons/header/header.component';
import { FooterComponent } from '../../components/commons/footer/footer.component';
import { SubscribeComponent } from '../../components/commons/subscribe/subscribe.component';

import { MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule } from '@angular/material';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SubscribeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SubscribeComponent
  ],
  providers: [],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class CommonsModule { }
