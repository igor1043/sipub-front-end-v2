import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthResponse, LoginRequest } from './models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro na requisição de login:', error);
        return throwError(() => error); 
      })
    );
  }
}