import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuegosService } from '../../services/juegos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  juego: any;

  constructor(private route: ActivatedRoute, private juegosService: JuegosService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerDetallesJuego(id);
    }
  }

  obtenerDetallesJuego(id: string): void {
    this.juegosService.getJuegoById(id).subscribe((data) => {
      this.juego = data;
    });
  }
}
