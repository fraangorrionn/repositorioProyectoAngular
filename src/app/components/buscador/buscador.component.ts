import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  searchTerm: string = '';
  filterAttribute: string = 'name'; // Atributo por el que se buscará
  sortOption: string = 'name'; // Opción de ordenamiento

  @Output() searchTermChange = new EventEmitter<{ term: string, attribute: string }>();
  @Output() sortOptionChange = new EventEmitter<string>();

  onSearch(): void {
    console.log("🔍 BuscadorComponent emitiendo búsqueda:", { term: this.searchTerm, attribute: this.filterAttribute });
    this.searchTermChange.emit({ term: this.searchTerm, attribute: this.filterAttribute });
  }

  onSort(): void {
    console.log("📌 BuscadorComponent emitiendo orden:", this.sortOption);
    this.sortOptionChange.emit(this.sortOption);
  }
}
