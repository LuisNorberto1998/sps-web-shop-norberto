import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private uri: string = environment.baseURL; // URL base de la API

  // Headers comunes para las peticiones
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Método POST genérico para enviar datos y recibir una respuesta tipada
  public post<T, R>(body: T, url: string): Observable<R> {
    return this.http
      .post<R>(`${this.uri}${url}`, body, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Método GET genérico para obtener datos
  public get<R>(url: string, params?: any): Observable<R> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }

    return this.http
      .get<R>(`${this.uri}${url}`, { ...this.httpOptions, params: httpParams })
      .pipe(retry(1), catchError(this.handleError));
  }

  // Método PUT genérico para actualizar datos
  public put<T, R>(body: T, url: string): Observable<R> {
    return this.http
      .put<R>(`${this.uri}${url}`, body, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Método DELETE genérico para eliminar datos
  public delete<R>(url: string): Observable<R> {
    return this.http
      .delete<R>(`${this.uri}${url}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Manejo centralizado de errores HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El backend devolvió un código de error
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
