import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditingProyectPageRoutingModule } from './editing-proyect-routing.module';

import { EditingProyectPage } from './editing-proyect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditingProyectPageRoutingModule
  ],
  declarations: [EditingProyectPage]
})
export class EditingProyectPageModule {}
