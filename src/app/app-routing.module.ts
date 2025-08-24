import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroUsuariosScreenComponent } from './screens/registro-usuarios-screen/registro-usuarios-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { AlumnosScreenComponent } from './screens/alumnos-screen/alumnos-screen.component';
import { MaestrosScreenComponent } from './screens/maestros-screen/maestros-screen.component';
import { GraficasScreenComponent } from './screens/graficas-screen/graficas-screen.component';

const routes: Routes = [
  // Layout de autenticación (SIN sidebar)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginScreenComponent, pathMatch: 'full' },
      { path: 'registro-usuarios', component: RegistroUsuariosScreenComponent, pathMatch: 'full' },
      { path: 'registro-usuarios/:rol/:id', component: RegistroUsuariosScreenComponent, pathMatch: 'full' },
    ],
  },

  // Layout del dashboard (CON sidebar)
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomeScreenComponent, pathMatch: 'full' },
      { path: 'alumnos', component: AlumnosScreenComponent, pathMatch: 'full' },
      { path: 'maestros', component: MaestrosScreenComponent, pathMatch: 'full' },
      { path: 'administrador', component: AdminScreenComponent, pathMatch: 'full' },
      { path: 'graficas', component: GraficasScreenComponent, pathMatch: 'full' },
    ],
  },

  // (Opcional) 404
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
