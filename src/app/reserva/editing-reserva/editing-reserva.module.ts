import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditingReservaPageRoutingModule } from './editing-reserva-routing.module';

import { EditingReservaPage } from './editing-reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditingReservaPageRoutingModule
  ],
  declarations: [EditingReservaPage]
})
export class EditingReservaPageModule {}
