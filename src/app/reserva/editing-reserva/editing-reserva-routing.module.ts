import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditingReservaPage } from './editing-reserva.page';

const routes: Routes = [
  {
    path: '',
    component: EditingReservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditingReservaPageRoutingModule {}
