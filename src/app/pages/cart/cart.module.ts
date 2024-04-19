import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { MatListModule } from '@angular/material/list';
import { PipesModule } from '../../pipes/pipes.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatListModule,
    PipesModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class CartModule { }
