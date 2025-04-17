import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AccountResponse } from './models/account.model';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';
import { AccountConfigurationResponse } from './models/account.image.model';
import { mapBeAccountToAccount } from 'app/core/interfaces/account.interface';
import { LampCountResponse } from './models/account.count';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService,) { }

  getAccounts(): Observable<AccountResponse> {
    return this.http.get<any>(`${environment.apiUrl}/account`).pipe(
      map(response => ({
        meta: response.meta,
        data: response.data.map((beAccount: any) => mapBeAccountToAccount(beAccount))
      })),
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
  
  getLampCountByAccount(accountId: number): Observable<LampCountResponse> {
    const url = `${environment.apiUrl}/lightingpoint/lamp/account/${accountId}/count`;
  
    return this.http.get<LampCountResponse>(url).pipe(
      catchError((error) => {
        console.error(`Erro ao obter quantidade de lâmpadas da conta ${accountId}:`, error);
        return throwError(() => new Error('Erro ao obter a quantidade de lâmpadas da conta'));
      })
    );
  }
  
}
