import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuegosService } from '../../services/juegos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-compania',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-compania.component.html',
  styleUrls: ['./detalle-compania.component.css']
})
export class DetalleCompaniaComponent implements OnInit {
  compania: any;
  juegos: any[] = [];

  constructor(private route: ActivatedRoute, private juegosService: JuegosService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerDetallesCompania(id);
    }
  }

  obtenerDetallesCompania(id: string): void {
    this.juegosService.getCompaniaById(id).subscribe((data) => {
        this.compania = data;

        // Verifica si la compañía tiene un nombre válido para buscar juegos
        if (this.compania?.name) {
            this.obtenerJuegosDeCompania(this.compania.name);
        }
    });
  }

  obtenerJuegosDeCompania(developerName: string): void {
      this.juegosService.getJuegosByCompania(developerName).subscribe((data) => {
          this.juegos = data.results; // RAWG API almacena los juegos en 'results'
      });
  }
}
