import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationComponent } from 'app/desing-system/ui-components/notification/notification.component';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) { }

  private show(
    type: NotificationType,
    title: string,
    duration: number = 5000,
    description?: string,
    icon?: string
  ): MatSnackBarRef<NotificationComponent> {
    return this.snackBar.openFromComponent(NotificationComponent, {
      data: { type, title, description, icon, duration },
      duration,
      panelClass: [`${type}-snackbar`],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  showSuccess(title: string, duration?: number, description?: string, icon?: string) : MatSnackBarRef<NotificationComponent>{
    return this.show('success', title, duration, description, icon);
  }

  showError(title: string, duration?: number, description?: string, icon?: string): MatSnackBarRef<NotificationComponent> {
    return this.show('error', title, duration, description, icon);
  }

  showWarning(title: string, duration?: number, description?: string, icon?: string): MatSnackBarRef<NotificationComponent> {
    return this.show('warning', title, duration, description, icon);
  }

  showInfo(title: string, duration?: number, description?: string, icon?: string): MatSnackBarRef<NotificationComponent> {
    return this.show('info', title, duration, description, icon);
  }
}