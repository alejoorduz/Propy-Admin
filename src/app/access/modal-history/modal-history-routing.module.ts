import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalHistoryPage } from './modal-history.page';

const routes: Routes = [
  {
    path: '',
    component: ModalHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalHistoryPageRoutingModule {}
