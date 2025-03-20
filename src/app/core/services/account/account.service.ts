import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AccountResponse } from './models/account.model';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private apiUrl = `${environment.apiUrl}/account`;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService,) { }

  getAccounts(): Observable<AccountResponse> {
    const token = this.localStorageService.getCurrentUser()?.token

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
