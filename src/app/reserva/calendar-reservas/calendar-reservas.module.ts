import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarReservasPageRoutingModule } from './calendar-reservas-routing.module';

import { CalendarReservasPage } from './calendar-reservas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarReservasPageRoutingModule
  ],
  declarations: [CalendarReservasPage]
})
export class CalendarReservasPageModule {}
