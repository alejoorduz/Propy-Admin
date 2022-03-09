import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddingProyectPage } from './adding-proyect.page';

const routes: Routes = [
  {
    path: '',
    component: AddingProyectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddingProyectPageRoutingModule {}
