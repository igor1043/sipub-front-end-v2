import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AccountResponse } from './models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private apiUrl = `${environment.apiUrl}/v1/account`;

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<AccountResponse> {
    // Recupera o token do localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
      return throwError(() => new Error('Token de autenticação não encontrado'));
    }

    // Configura o header com o token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Faz a requisição GET
    return this.http.get<AccountResponse>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Erro na requisição de contas:', error);
        return throwError(() => new Error('Erro ao obter a lista de contas'));
      })
    );
  }
}
