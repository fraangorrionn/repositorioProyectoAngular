import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit, OnDestroy {
  @Input() imagenesCarrusel: string[] = []; // Recibe imágenes desde JuegosComponent
  currentSlide: number = 0;
  intervalId: any;

  ngOnInit(): void {
      this.iniciarCarrusel();
  }

  iniciarCarrusel(): void {
      this.intervalId = setInterval(() => {
          this.nextSlide();
      }, 3000);
  }

  prevSlide(): void {
      this.currentSlide = (this.currentSlide === 0) ? this.imagenesCarrusel.length - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
      this.currentSlide = (this.currentSlide === this.imagenesCarrusel.length - 1) ? 0 : this.currentSlide + 1;
  }

  ngOnDestroy(): void {
      clearInterval(this.intervalId);
  }
}