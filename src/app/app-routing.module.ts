import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'iniciosesion',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'iniciosesion',
    loadChildren: () => import('./iniciosesion/iniciosesion.module').then( m => m.IniciosesionPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'comunicados',
    loadChildren: () => import('./comunicados/comunicados.module').then( m => m.ComunicadosPageModule)
  },
  {
    path: 'pagoadmin',
    loadChildren: () => import('./pagoadmin/pagoadmin.module').then( m => m.PagoadminPageModule)
  },
  {
    path: 'reservas',
    loadChildren: () => import('./reserva/reservas/reservas.module').then( m => m.ReservasPageModule)
  },
  {
    path: 'verificacion',
    loadChildren: () => import('./verificacion/verificacion.module').then( m => m.VerificacionPageModule)
  },
  {
    path: 'recuperacion',
    loadChildren: () => import('./recuperacion/recuperacion.module').then( m => m.RecuperacionPageModule)
  },
  {
    path: 'proyectos',
    loadChildren: () => import('./administraciones/proyectos/proyectos.module').then( m => m.ProyectosPageModule)
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
    path: 'editing-reserva',
    loadChildren: () => import('./reserva/editing-reserva/editing-reserva.module').then( m => m.EditingReservaPageModule)
  },
  {
    path: 'calendar-reservas',
    loadChildren: () => import('./reserva/calendar-reservas/calendar-reservas.module').then( m => m.CalendarReservasPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'monitoreo',
    loadChildren: () => import('./monitoreo/monitoreo.module').then( m => m.MonitoreoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'botonera',
    loadChildren: () => import('./aircall/botonera/botonera.module').then( m => m.BotoneraPageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./aircall/scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'emergencias',
    loadChildren: () => import('./emergencias/emergencias.module').then( m => m.EmergenciasPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
