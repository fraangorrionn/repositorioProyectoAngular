import { Routes } from '@angular/router';
import { HomeComponent } from './principales/home/home.component';
import { ContactoComponent } from './principales/contacto/contacto.component';
import { DetalleComponent } from './principales/detalle/detalle.component';
import { DetalleCompaniaComponent } from './components/detalle-compania/detalle-compania.component';
import { ContenidoJuegosComponent } from './components/contenido-juegos/contenido-juegos.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { searchTerm: '', sortOption: '' } },
  { path: 'home', redirectTo: '', pathMatch: 'full' }, 
  { path: 'contacto', component: ContactoComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'compania/:id', component: DetalleCompaniaComponent },
  { path: 'juegos', component: ContenidoJuegosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'favoritos', component: FavoritosComponent },
];
