import { Injectable } from '@angular/core';
import { AuthResponse } from '../services/auth/models/auth.model';
import { User } from './models/user.model';
import { Account } from './models/account.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly USER_KEY = 'currentUser';
  private readonly ACCOUNT_KEY = 'currentAccount';

  constructor() {}

  saveDatalogin(response: AuthResponse): void {
    const user: User = {
      token: response.data.token,
      username: response.data.username,
      id_user: response.data.id_user,
      role_name: response.data.acl?.role_name || '',
      is_admin_account: response.data.acl?.is_admin_account || false,
      is_admin: response.data.acl?.is_admin || false,
      is_coordinator: response.data.acl?.is_coordinator || false,
      has_account_access: response.data.acl?.has_account_access || false
    };

    const account: Account = {
      alias: response.data.alias,
      state: response.data.state || '',
      city: response.data.city || '',
      id_account: response.data.acl?.id_account || 0,
      module_groups: response.data.module_groups || []
    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.ACCOUNT_KEY, JSON.stringify(account));
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.ACCOUNT_KEY);
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  getCurrentAccount(): Account | null {
    const accountJson = localStorage.getItem(this.ACCOUNT_KEY);
    return accountJson ? JSON.parse(accountJson) : null;
  }
}
