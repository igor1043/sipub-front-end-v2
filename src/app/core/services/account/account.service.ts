import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AccountResponse } from './models/account.model';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';
import { AccountConfigurationResponse } from './models/account.image.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private apiUrl = `${environment.apiUrl}/account`;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService,) { }

  getAccounts(): Observable<AccountResponse> {
    // Faz a requisição GET
    return this.http.get<AccountResponse>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erro na requisição de contas:', error);
        return throwError(() => new Error('Erro ao obter a lista de contas'));
      })
    );
  }

  getAccountImageConfiguration(accountId: number): Observable<AccountConfigurationResponse> {
    const configurationUrl = `${environment.apiUrl}/photo/1/account/${accountId}/folder/configuration`;

    return this.http.get<AccountConfigurationResponse>(configurationUrl).pipe(
      catchError((error) => {
        console.error('Erro na requisição de configuração:', error);
        return throwError(() => new Error('Erro ao obter a configuração da conta'));
      })
    );
  }
}
