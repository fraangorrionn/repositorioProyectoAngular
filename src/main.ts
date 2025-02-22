import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // Usa config normal

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error("Error en la inicialización:", err));
