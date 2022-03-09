import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarReservasPage } from './calendar-reservas.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarReservasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarReservasPageRoutingModule {}
