import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditingProyectPage } from './editing-proyect.page';

const routes: Routes = [
  {
    path: '',
    component: EditingProyectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditingProyectPageRoutingModule {}
