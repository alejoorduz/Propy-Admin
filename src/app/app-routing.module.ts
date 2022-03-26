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
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'documentos',
    loadChildren: () => import('./documentos/documentos.module').then( m => m.DocumentosPageModule)
  },
  {
    path: 'mascotas',
    loadChildren: () => import('./mascotas/mascotas.module').then( m => m.MascotasPageModule)
  },
  {
    path: 'trasteos',
    loadChildren: () => import('./trasteos/trasteos.module').then( m => m.TrasteosPageModule)
  },
  {
    path: 'clasificados',
    loadChildren: () => import('./clasificados/clasificados.module').then( m => m.ClasificadosPageModule)
  },
  {
    path: 'directorio',
    loadChildren: () => import('./directorio/directorio.module').then( m => m.DirectorioPageModule)
  },
  {
    path: 'finanzas',
    loadChildren: () => import('./finanzas/finanzas.module').then( m => m.FinanzasPageModule)
  },
  {
    path: 'autorizaciones',
    loadChildren: () => import('./autorizaciones/autorizaciones.module').then( m => m.AutorizacionesPageModule)
  },
  {
    path: 'beneficios',
    loadChildren: () => import('./beneficios/beneficios.module').then( m => m.BeneficiosPageModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./seguridad/seguridad.module').then( m => m.SeguridadPageModule)
  },
  {
    path: 'preguntas',
    loadChildren: () => import('./preguntas/preguntas.module').then( m => m.PreguntasPageModule)
  },
  {
    path: 'acceso',
    loadChildren: () => import('./acceso/acceso.module').then( m => m.AccesoPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'citofonia',
    loadChildren: () => import('./citofonia/citofonia.module').then( m => m.CitofoniaPageModule)
  },
  {
    path: 'encuestas',
    loadChildren: () => import('./encuestas/encuestas.module').then( m => m.EncuestasPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
