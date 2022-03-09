import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddingProyectPageRoutingModule } from './adding-proyect-routing.module';

import { AddingProyectPage } from './adding-proyect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddingProyectPageRoutingModule
  ],
  declarations: [AddingProyectPage]
})
export class AddingProyectPageModule {}
