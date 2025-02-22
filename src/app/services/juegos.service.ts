import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class JuegosService {
      private API_KEY = '5900c10a27ce40ceb58ec91b6a24e6f4';
      private API_URL = `https://api.rawg.io/api/games`;
      private API_COMPANIAS_URL = `https://api.rawg.io/api/developers`;
  
      constructor(private http: HttpClient) {}
  
      // Obtener la lista de juegos
      getJuegos(): Observable<any> {
          return this.http.get<any>(`${this.API_URL}?key=${this.API_KEY}`).pipe(
              catchError(this.handleError)
          );
      }
  
      // Obtener un juego por ID
      getJuegoById(id: string): Observable<any> {
          return this.http.get<any>(`${this.API_URL}/${id}?key=${this.API_KEY}`).pipe(
              catchError(this.handleError)
          );
      }
  
      // Obtener compañía por ID
      getCompaniaById(id: string): Observable<any> {
          return this.http.get<any>(`${this.API_COMPANIAS_URL}/${id}?key=${this.API_KEY}`).pipe(
              catchError(this.handleError)
          );
      }

      getJuegosByCompania(developerName: string): Observable<any> {
        const url = `https://api.rawg.io/api/games?key=${this.API_KEY}&developers=${encodeURIComponent(developerName)}`;
        return this.http.get<any>(url).pipe(
            catchError(this.handleError)
        );
    }

    getTodosLosJuegos(): Observable<any[]> {
        let allGames: any[] = [];
        const maxPages: number = 5; // Puedes ajustar este número según la cantidad de juegos que necesites
        const requests: Observable<any>[] = []; // 🔹 Definimos que 'requests' es un array de Observables
      
        for (let page = 1; page <= maxPages; page++) {
          const request: Observable<any> = this.http.get<any>(`${this.API_URL}?key=${this.API_KEY}&page=${page}&page_size=40`).pipe(
            catchError(this.handleError)
          );
          requests.push(request);
        }
      
        return new Observable<any[]>((observer) => {
          let completedRequests: number = 0;
      
          requests.forEach((req: Observable<any>) => {
            req.subscribe({
              next: (data: any) => { // 🔹 Especificamos el tipo de 'data'
                if (data.results) {
                  allGames = [...allGames, ...data.results];
                }
                completedRequests++;
      
                if (completedRequests === requests.length) {
                  observer.next(allGames);
                  observer.complete();
                }
              },
              error: (err: any) => observer.error(err), // 🔹 Especificamos el tipo de 'err'
            });
          });
        });
      }
      
      
    
        
  
      // Manejo de errores
      private handleError(error: HttpErrorResponse) {
          console.error('Error en la API:', error);
          return throwError(() => new Error('Error al obtener los datos. Intenta nuevamente más tarde.'));
      }
  }
  