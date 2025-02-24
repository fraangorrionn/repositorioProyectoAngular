import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { JuegosService } from '../../services/juegos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contenido-juegos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contenido-juegos.component.html',
  styleUrls: ['./contenido-juegos.component.css']
})
export class ContenidoJuegosComponent implements OnInit {
  listaJuegos: any[] = [];
  juegosFiltrados: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  searchTerm: { term: string; attribute: string } = { term: '', attribute: 'name' };
  sortOption: string = 'name';

  constructor(
    private juegosService: JuegosService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerTodosLosJuegos();

    this.route.queryParams.subscribe(params => {
      if (params['term'] && params['attribute']) {
        this.searchTerm = { term: params['term'], attribute: params['attribute'] };
      }
      if (params['sort']) {
        this.sortOption = params['sort'];
      }
      this.aplicarFiltros();
    });
  }

  obtenerTodosLosJuegos(): void {
    this.juegosService.getJuegos().subscribe((response: any) => {
      if (response && response.results) {
        this.listaJuegos = response.results;
        this.juegosFiltrados = [...this.listaJuegos];
        this.loading = false;
        this.cdr.detectChanges();
      }
    }, error => {
      this.error = 'Error al cargar los juegos.';
      this.loading = false;
      console.error('Error al obtener los juegos:', error);
    });
  }

  aplicarFiltros(): void {
    if (this.searchTerm.term && this.listaJuegos.length) {
      const { term, attribute } = this.searchTerm;
      console.log("Filtrando por:", attribute, "con valor:", term);

      this.juegosFiltrados = this.listaJuegos.filter(juego =>
        juego[attribute]?.toString().toLowerCase().includes(term.toLowerCase())
      );
    }

    if (this.sortOption) {
      this.juegosFiltrados.sort((a, b) => {
        if (typeof a[this.sortOption] === 'string') {
          return a[this.sortOption].localeCompare(b[this.sortOption]);
        } else {
          return a[this.sortOption] - b[this.sortOption];
        }
      });
    }

    console.log("Juegos después del filtrado:", this.juegosFiltrados);
    this.cdr.detectChanges();
  }

  verDetalles(juego: any): void {
    this.router.navigate(['/detalle', juego.id]);
  }

  guardarEnFavoritos(juego: any) {
    let favoritos = localStorage.getItem('favoritos');
    let listaFavoritos: any[] = favoritos ? JSON.parse(favoritos) : [];

    if (this.esFavorito(juego)) {
      listaFavoritos = listaFavoritos.filter((fav: any) => fav.id !== juego.id);
      console.log("Juego eliminado de favoritos:", juego.name);
    } else {
      listaFavoritos.push(juego);
      console.log("Juego guardado en favoritos:", juego.name);
    }

    localStorage.setItem('favoritos', JSON.stringify(listaFavoritos));  
  }

  esFavorito(juego: any): boolean {
    let favoritos = localStorage.getItem('favoritos');
    let listaFavoritos: any[] = favoritos ? JSON.parse(favoritos) : [];
    return listaFavoritos.some((fav: any) => fav.id === juego.id);
  }

  toggleFavorito(juego: any) {
    this.guardarEnFavoritos(juego);
  }
}
