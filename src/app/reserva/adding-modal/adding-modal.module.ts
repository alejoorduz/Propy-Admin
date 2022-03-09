import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddingModalPageRoutingModule } from './adding-modal-routing.module';

import { AddingModalPage } from './adding-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddingModalPageRoutingModule
  ],
  declarations: [AddingModalPage]
})
export class AddingModalPageModule {}
