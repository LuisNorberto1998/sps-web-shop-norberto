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
  private uri: string = environment.baseURL;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public post<T, R>(body: T, url: string): Observable<R> {
    return this.http
      .post<R>(`${this.uri}${url}`, body, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

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

  public put<T, R>(body: T, url: string): Observable<R> {
    return this.http
      .put<R>(`${this.uri}${url}`, body, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  public delete<R>(url: string): Observable<R> {
    return this.http
      .delete<R>(`${this.uri}${url}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
