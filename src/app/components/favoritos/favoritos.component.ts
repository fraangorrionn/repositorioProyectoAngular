import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrouselComponent } from '../carrousel/carrousel.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, CarrouselComponent], // Importamos el carrusel
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  juegosFavoritos: any[] = [];
  imagenesFavoritos: string[] = [];

  ngOnInit() {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    const favoritos = localStorage.getItem('favoritos');
    this.juegosFavoritos = favoritos ? JSON.parse(favoritos) : [];

    // Extraer imágenes para el carrusel
    this.imagenesFavoritos = this.juegosFavoritos.map(juego => juego.background_image);
  }

  eliminarDeFavoritos(juegoId: number) {
    this.juegosFavoritos = this.juegosFavoritos.filter(juego => juego.id !== juegoId);
    localStorage.setItem('favoritos', JSON.stringify(this.juegosFavoritos));

    // Actualizar el carrusel eliminando la imagen del juego
    this.imagenesFavoritos = this.juegosFavoritos.map(juego => juego.background_image);
  }
}
