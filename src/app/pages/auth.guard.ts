import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object // Injetar PLATFORM_ID
  ) {}

  canActivate(): boolean {
    // Verifica se está no navegador
    if (isPlatformBrowser(this.platformId)) {

      const token = this.localStorageService.getCurrentUser()?.token;
      localStorage.getItem('authToken');

      if (token) {
        return true; // Permite o acesso à rota
      } else {
        this.router.navigate(['/login']); // Redireciona para a página de login
        return false; // Bloqueia o acesso à rota
      }
    } else {
      // Se não estiver no navegador, bloqueia o acesso
      return false;
    }
  }
}