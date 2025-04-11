import { Injectable } from '@angular/core';
import { AuthResponse } from '../services/auth/models/auth.model';
import { User } from './models/user.model';
import { Account } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly USER_KEY = 'currentUser';
  private readonly ACCOUNT_KEY = 'currentAccount';
  private readonly ACCOUNT_SELECTED_KEY = 'accountSelected';
  private readonly MODULES_KEY = 'availableModules';
  private readonly CURRENT_MODULE_KEY = 'currentModule';

  constructor() {}

  saveDatalogin(response: AuthResponse): void {
    const user: User = {
      token: response.data.token,
      username: response.data.username,
      id_user: response.data.id_user,
      id_person: response.data.id_person,
      role_name: response.data.acl?.role_name || '',
      is_admin_account: response.data.acl?.is_admin_account || false,
      is_admin: response.data.acl?.is_admin || false,
      is_coordinator: response.data.acl?.is_coordinator || false,
      has_account_access: response.data.acl?.has_account_access || false
    };

    const account: Account = {
      id: response.data.acl?.id_account || 0,
      name: response.data.account_name,
      alias: response.data.alias,
      created_at: "Data Não Disponível",
      is_admin: response.data.acl?.is_admin_account || false,
      is_coordinator: response.data.acl?.is_coordinator || false,
      billing: false,
      state: response.data.state || '',
      city: response.data.city || '',
      url_account: "https://www.example.com",
    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.ACCOUNT_KEY, JSON.stringify(account));
    localStorage.setItem(this.ACCOUNT_SELECTED_KEY, JSON.stringify(account));
    
    const availableModules = [1, 16];
    this.saveAvailableModules(availableModules);
    this.setCurrentModule(availableModules[0]);
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.ACCOUNT_KEY);
    localStorage.removeItem(this.ACCOUNT_SELECTED_KEY);
    localStorage.removeItem(this.MODULES_KEY);
    localStorage.removeItem(this.CURRENT_MODULE_KEY);
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  getCurrentAccount(): Account | null {
    const accountJson = localStorage.getItem(this.ACCOUNT_KEY);
    return accountJson ? JSON.parse(accountJson) : null;
  }

  getAccountSelected(): Account | null {
    const accountSelectedJson = localStorage.getItem(this.ACCOUNT_SELECTED_KEY);
    return accountSelectedJson ? JSON.parse(accountSelectedJson) : null;
  }

  setAccountSelected(account: Account): void {
    localStorage.setItem(this.ACCOUNT_SELECTED_KEY, JSON.stringify(account));
  }

  clearAccountSelected(): void {
    localStorage.removeItem(this.ACCOUNT_SELECTED_KEY);
  }

  saveAvailableModules(moduleIds: number[]): void {
    localStorage.setItem(this.MODULES_KEY, JSON.stringify(moduleIds));
  }

  getAvailableModules(): number[] {
    const modulesJson = localStorage.getItem(this.MODULES_KEY);
    return modulesJson ? JSON.parse(modulesJson) : [];
  }

  getCurrentModule(): number | null {
    const moduleJson = localStorage.getItem(this.CURRENT_MODULE_KEY);
    return moduleJson ? JSON.parse(moduleJson) : null;
  }

  setCurrentModule(moduleId: number): void {
    localStorage.setItem(this.CURRENT_MODULE_KEY, JSON.stringify(moduleId));
  }

  clearCurrentModule(): void {
    localStorage.removeItem(this.CURRENT_MODULE_KEY);
  }
}
