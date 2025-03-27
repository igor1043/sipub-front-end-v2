import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from '../../desing-system/ui-components/notification/NotificationService';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  // Obtém o token do LocalStorage
  const token = localStorageService.getCurrentUser()?.token;

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
      console.log('Interceptor triggered for:', req.url);
      console.log('Status route:', error.status);

      if (error.status === 400 && isTokenError(error)) {
        handleTokenError(router, notificationService, localStorageService);
      }

      if (error.status === 503) {
        handleTokenError(router, notificationService, localStorageService);
      }

      return throwError(() => error);
    })
  );
};

// Função para verificar se o erro é de token inválido
function isTokenError(error: HttpErrorResponse): boolean {
  return error.error.meta?.errors?.some((err: any) =>
    err.parameter_name === 'token' &&
    err.type === 'invalid_parameter'
  );
}

function handleTokenError(router: Router, notificationService: NotificationService, localStorageService: LocalStorageService): void {
  const snackBarRef = notificationService.showError(
    'Sessão expirada.',
    2000,
    'Faça login novamente para continuar');
  //snackBarRef.afterDismissed().subscribe(() => {
    //localStorageService.logout()
    //router.navigate(['/login']);
  //});
 
  
}
