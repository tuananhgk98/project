import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { NgxSocialLoginModule } from 'ng8-social-login';
import { FacebookModule } from 'ngx-facebook';
import { CommonModule } from '@angular/common';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { HeaderComponent } from '../app/components/commons/header/header.component';
// import { FooterComponent } from '../app/components/commons/footer/footer.component';
// import { SubscribeComponent } from '../app/components/commons/subscribe/subscribe.component';



import { MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule } from '@angular/material';



import { LoaderService } from './service/loader.service';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { LoaderComponent } from './components/commons/loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { APIInterceptor } from './interceptor/api.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
    // HeaderComponent,
    // FooterComponent,
    // SubscribeComponent,


  ],
  imports: [CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
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
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: APIInterceptor,
    //   multi: true
    // },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
