import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalHistoryPageRoutingModule } from './modal-history-routing.module';

import { ModalHistoryPage } from './modal-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalHistoryPageRoutingModule
  ],
  declarations: [ModalHistoryPage]
})
export class ModalHistoryPageModule {}
