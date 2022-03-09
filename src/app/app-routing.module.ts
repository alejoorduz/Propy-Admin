import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'adding-proyect',
    loadChildren: () => import('./administraciones/adding-proyect/adding-proyect.module').then( m => m.AddingProyectPageModule)
  },
  {
    path: 'editing-proyect',
    loadChildren: () => import('./administraciones/editing-proyect/editing-proyect.module').then( m => m.EditingProyectPageModule)
  },
  {
    path: 'proyectos',
    loadChildren: () => import('./administraciones/proyectos/proyectos.module').then( m => m.ProyectosPageModule)
  },
  {
    path: 'botonera',
    loadChildren: () => import('./aircall/botonera/botonera.module').then( m => m.BotoneraPageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./aircall/scan/scan.module').then( m => m.ScanPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
