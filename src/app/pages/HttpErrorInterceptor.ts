import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from './NotificationService';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  // Obtém o token do LocalStorage
  const token = localStorageService.getCurrentUser()?.token + "ikmr";

  // Verifica se o token existe e adiciona no header
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('🚨 Interceptor triggered for:', req.url);

      if (error.status === 400 && isTokenError(error)) {
        handleTokenError(router, notificationService, localStorageService);
      }

      return throwError(() => error);
    })
  );
};

// 🔍 Função para verificar se o erro é de token inválido
function isTokenError(error: HttpErrorResponse): boolean {
  return error.error.meta?.errors?.some((err: any) => 
    err.parameter_name === 'token' && 
    err.type === 'invalid_parameter'
  );
}

function handleTokenError(router: Router, notificationService: NotificationService, localStorageService: LocalStorageService): void {
  // Remove token inválido

  // Mostra notificação
  notificationService.showError(
    'Sessão expirada. Redirecionando para login...',
    15000
  );

  // Redireciona após 15 segundos
  setTimeout(() => {
    //router.navigate(['/login']);
  }, 15000);
}
