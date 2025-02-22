import { Component, EventEmitter, Output, OnInit, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from '../buscador/buscador.component';
import { Router, RouterModule } from '@angular/router'; // ✅ Importamos RouterModule

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, BuscadorComponent, RouterModule], // ✅ Agregar RouterModule aquí
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, DoCheck {
  @Output() searchTermChange = new EventEmitter<{ term: string, attribute: string }>();
  @Output() sortOptionChange = new EventEmitter<string>();

  usuarioLogueado: boolean = false;
  fotoPerfil: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.verificarSesion();
  }

  ngDoCheck() {
    this.verificarSesion();
  }

  verificarSesion() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.usuarioLogueado = usuario && usuario.email ? true : false;
    this.fotoPerfil = usuario.fotoPerfil || null;
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.usuarioLogueado = false;
    this.fotoPerfil = null;
    this.router.navigate(['/login']);
  }

  onSearch(event: { term: string, attribute: string }): void {
    console.log("🔎 BuscadorComponent emitiendo búsqueda:", event);
  
    // ✅ Detectamos si estamos en la página de juegos o en home
    const currentRoute = this.router.url.startsWith('/juegos') ? '/juegos' : '/home';
  
    this.router.navigate([currentRoute], { queryParams: { term: event.term, attribute: event.attribute } });
  }
  
  onSort(option: string): void {
    console.log("📌 Evento de orden recibido en MenuComponent:", option);
  
    const currentRoute = this.router.url.startsWith('/juegos') ? '/juegos' : '/home';
  
    this.router.navigate([currentRoute], { queryParams: { sort: option } });
  }
}  
