import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angApp_v19'; 
  searchTerm: { term: string; attribute: string } = { term: '', attribute: 'name' };
  sortOption: string = '';

  constructor() {
    console.log("AppComponent ha sido inicializado correctamente.");
  }

  filtrarJuegos(event: { term: string; attribute: string }) {
    this.searchTerm = event;
    console.log("Buscando:", event);
  }

  ordenarJuegos(sortOption: string) {
    this.sortOption = sortOption;
    console.log("Ordenando por:", sortOption);
  }
}
