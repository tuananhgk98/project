import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartRoutingModule } from './cart-routing.module';

import { CartComponent } from './cart.component';
import { HeaderComponent } from '../../components/commons/header/header.component';
import { FooterComponent } from '../../components/commons/footer/footer.component';
import { SubscribeComponent } from '../../components/commons/subscribe/subscribe.component';

import { CommonsModule } from '../../components/commons/commons.module';


@NgModule({
  declarations: [CartComponent,
    // HeaderComponent,
    // FooterComponent,
    // SubscribeComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    CommonsModule
  ]
})
export class CartModule { }
