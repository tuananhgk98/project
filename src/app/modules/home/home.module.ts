import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CommonsModule } from '../../components/commons/commons.module';

import { NgxPaginationModule } from 'ngx-pagination';

import {AgmCoreModule, MapsAPILoader} from "@agm/core"
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { HeaderComponent } from '../../components/commons/header/header.component';
import { FooterComponent } from '../../components/commons/footer/footer.component';
import { SubscribeComponent } from '../../components/commons/subscribe/subscribe.component';
import { MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [HomeComponent,
     ProductDetailComponent,
     UserProfileComponent,
    //  HeaderComponent,
    //  FooterComponent,
    //  SubscribeComponent
    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonsModule,
    NgxPaginationModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyDUNFuTjXmVxs8bcr5xf8ZPPnBejsOURSM",
      libraries: ['geometry']
    })

  ]
  
})
export class HomeModule { }
