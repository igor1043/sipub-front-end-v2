import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { Account } from '../interfaces/account.interface';

@Injectable({ providedIn: 'root' })
export class AccountsMockService {
  private mockAccounts: Account[] = [
    {
      id: 1,
      name: 'Conta Energética Municipal',
      alias: 'CEM',
      created_at: '2022-01-15T08:00:00Z',
      is_admin: true,
      is_coordinator: false,
      billing: true,
      state: 'SP',
      city: 'São Paulo',
      url_account: 'https://www.example.com'
    },
    {
      id: 2,
      name: 'Distribuidora Norte Energia',
      alias: 'DNE',
      created_at: '2021-11-22T14:30:00Z',
      is_admin: false,
      is_coordinator: true,
      billing: false,
      state: 'RJ',
      city: 'Rio de Janeiro',
      url_account: 'https://www.example.com'
    },
    {
      id: 3,
      name: 'Consórcio de Iluminação Pública',
      alias: 'CIP',
      created_at: '2023-03-10T10:15:00Z',
      is_admin: false,
      is_coordinator: false,
      billing: true,
      state: 'MG',
      city: 'Belo Horizonte',
      url_account: 'https://www.example.com'
    },
    {
      id: 4,
      name: 'Gestão Urbana Sustentável',
      alias: 'GUS',
      created_at: '2020-05-05T09:45:00Z',
      is_admin: true,
      is_coordinator: true,
      billing: true,
      state: 'RS',
      city: 'Porto Alegre',
      url_account: 'https://www.example.com'
    },
    {
      id: 5,
      name: 'Operadora de Serviços Públicos',
      alias: 'OSP',
      created_at: '2023-07-01T16:20:00Z',
      is_admin: false,
      is_coordinator: false,
      billing: false,
      state: 'BA',
      city: 'Salvador',
      url_account: 'https://www.example.com'
    }
  ];

  getAccounts() {
    return of([...this.mockAccounts]).pipe(delay(1000));
  }

  createAccount(newAccount: Omit<Account, 'id' | 'created_at'>) {
    const account: Account = {
      ...newAccount,
      id: this.generateId(),
      created_at: new Date().toISOString()
    };
    this.mockAccounts.push(account);
    return of(account).pipe(delay(1000));
  }

  updateAccount(id: number, updatedAccount: Partial<Account>) {
    const index = this.mockAccounts.findIndex(a => a.id === id);
    if (index > -1) {
      this.mockAccounts[index] = {
        ...this.mockAccounts[index],
        ...updatedAccount
      };
      return of(this.mockAccounts[index]).pipe(delay(300));
    }
    return of(null);
  }

  deleteAccount(id: number) {
    this.mockAccounts = this.mockAccounts.filter(a => a.id !== id);
    return of({ success: true }).pipe(delay(200));
  }

  getAccountById(id: number) {
    const account = this.mockAccounts.find(a => a.id === id);
    return of(account ? {...account} : null).pipe(delay(150));
  }

  searchAccounts(term: string) {
    const results = this.mockAccounts.filter(a =>
      a.name.toLowerCase().includes(term.toLowerCase()) ||
      a.alias.toLowerCase().includes(term.toLowerCase())
    );
    return of(results).pipe(delay(250));
  }

  private generateId(): number {
    return Math.max(...this.mockAccounts.map(a => a.id)) + 1;
  }
}
