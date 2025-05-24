import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroUsuariosScreenComponent } from './screens/registro-usuarios-screen/registro-usuarios-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { AlumnosScreenComponent } from './screens/alumnos-screen/alumnos-screen.component';
import { MaestrosScreenComponent } from './screens/maestros-screen/maestros-screen.component';
import { GraficasScreenComponent } from './screens/graficas-screen/graficas-screen.component';
import { ListaEventosComponent } from './screens/lista-eventos/lista-eventos.component';
import { RegistroEventosComponent } from './partials/registro-eventos/registro-eventos.component';

const routes: Routes = [
  { path:'', component: LoginScreenComponent, pathMatch: 'full'},
  { path:'registro-usuarios', component: RegistroUsuariosScreenComponent, pathMatch: 'full'},
  { path:'registro-usuarios/:rol/:id', component: RegistroUsuariosScreenComponent, pathMatch: 'full'}, //a la hora de seleccionar algun usuario registrado, este va a saber cual es 
  { path:'home', component: HomeScreenComponent, pathMatch: 'full'},
  { path: 'alumnos', component: AlumnosScreenComponent, pathMatch: 'full' },
  { path: 'maestros', component: MaestrosScreenComponent, pathMatch: 'full' },
  { path: 'administrador', component: AdminScreenComponent, pathMatch: 'full' },
  { path: 'graficas', component: GraficasScreenComponent, pathMatch: 'full' },
  {path: 'eventos-academicos', component: ListaEventosComponent, pathMatch:'full'},
  // Esto NO capturará la ruta con parámetro
  { path: 'registro-eventos', component: RegistroEventosComponent, pathMatch: 'full' }, 
// Esto SÍ capturará '/registro-eventos/1'
  { path: 'registro-eventos/:id', component: RegistroEventosComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
