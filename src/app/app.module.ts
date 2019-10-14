import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpInterceptor } from '@angular/common/http';
import {NgxSocialLoginModule} from 'ng8-social-login';
import { FacebookModule } from 'ngx-facebook';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { HeaderComponent } from '../app/components/commons/header/header.component';
// import { FooterComponent } from '../app/components/commons/footer/footer.component';
// import { SubscribeComponent } from '../app/components/commons/subscribe/subscribe.component';



import { MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule } from '@angular/material';




@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // FooterComponent,
    // SubscribeComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    FacebookModule.forRoot(),
    NgxSocialLoginModule.init(
      {
          google: {
              client_id: '980432911492-mt13je8t7hoqmie1mdilur17ole447m1.apps.googleusercontent.com'
          },
          // facebook: {
          //     initOptions: {
          //         appId: 'YOUR_APP_ID'
          //     }
          // }
      }
  ),

  ],
  // exports: [
  //   HeaderComponent,
  //   FooterComponent,
  //   SubscribeComponent
  // ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
