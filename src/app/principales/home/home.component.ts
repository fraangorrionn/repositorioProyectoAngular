import { Component, OnInit, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosService } from '../../services/juegos.service';
import { CarrouselComponent } from '../../components/carrousel/carrousel.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarrouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listaJuegos: any[] = [];
  juegosFiltrados: any[] = [];
  imagenesCarrusel: string[] = [];

  @Input() searchTerm!: { term: string; attribute: string };
  @Input() sortOption!: string;

  constructor(private juegosService: JuegosService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.obtenerJuegos();
    
    // ✅ Escucha cambios en la URL para actualizar búsqueda y ordenamiento
    this.route.queryParams.subscribe(params => {
      if (params['term'] && params['attribute']) {
        this.searchTerm = { term: params['term'], attribute: params['attribute'] };
      }
      if (params['sort']) {
        this.sortOption = params['sort'];
      }
      this.aplicarFiltros(); // Aplica los filtros en tiempo real
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("🛠 HomeComponent detectó cambios:", changes);

    if (changes['searchTerm']) {
      console.log("🔍 Nuevo término de búsqueda recibido:", this.searchTerm);
    }

    if (changes['sortOption']) {
      console.log("📌 Nueva opción de orden recibido:", this.sortOption);
    }

    if (changes['searchTerm'] || changes['sortOption']) {
      this.aplicarFiltros();
    }
  }

  obtenerJuegos(): void {
    this.juegosService.getJuegos().subscribe((response: any) => {
      if (response && response.results) {
        this.listaJuegos = response.results;
        this.juegosFiltrados = [...this.listaJuegos];

        // Seleccionar solo 5 imágenes destacadas para el carrusel
        this.imagenesCarrusel = this.listaJuegos.slice(0, 5).map(juego => juego.background_image);
        
        this.cdr.detectChanges(); // 🔴 IMPORTANTE: Forzar la detección de cambios
      }
    }, error => console.error('Error al obtener los juegos:', error));
  }

  aplicarFiltros(): void {
    console.log("📌 Aplicando filtros en HomeComponent...");
    
    if (this.searchTerm && this.listaJuegos.length) {
      const { term, attribute } = this.searchTerm;
      console.log("🔎 Filtrando por:", attribute, "con valor:", term);
  
      this.juegosFiltrados = this.listaJuegos.filter(juego =>
        juego[attribute]?.toString().toLowerCase().includes(term.toLowerCase())
      );
    }
  
    // ✅ Ordenar según la opción seleccionada
    if (this.sortOption) {
      this.juegosFiltrados.sort((a, b) => {
        if (typeof a[this.sortOption] === 'string') {
          return a[this.sortOption].localeCompare(b[this.sortOption]);
        } else {
          return a[this.sortOption] - b[this.sortOption];
        }
      });
    }
  
    console.log("🎯 Juegos después del filtrado:", this.juegosFiltrados);
    this.cdr.detectChanges(); // 🔴 IMPORTANTE: Forzar la actualización de la vista
  }

  verDetalles(juego: any): void {
    this.router.navigate(['/detalle', juego.id]); // Redirige a la página de detalles
  }

  guardarEnFavoritos(juego: any) {
    let favoritos = localStorage.getItem('favoritos');
    let listaFavoritos: any[] = favoritos ? JSON.parse(favoritos) : [];

    // Si ya está guardado, lo eliminamos; si no, lo agregamos
    if (this.esFavorito(juego)) {
        listaFavoritos = listaFavoritos.filter((fav: any) => fav.id !== juego.id);
        console.log("❌ Juego eliminado de favoritos:", juego.name);
    } else {
        listaFavoritos.push(juego);
        console.log("✅ Juego guardado en favoritos:", juego.name);
    }

    localStorage.setItem('favoritos', JSON.stringify(listaFavoritos));  
  }

  // ✅ Función para verificar si un juego está en favoritos
  esFavorito(juego: any): boolean {
      let favoritos = localStorage.getItem('favoritos');
      let listaFavoritos: any[] = favoritos ? JSON.parse(favoritos) : [];
      return listaFavoritos.some((fav: any) => fav.id === juego.id);
  }

  // ✅ Función para alternar el estado de favorito
  toggleFavorito(juego: any) {
      this.guardarEnFavoritos(juego);
  }

}

