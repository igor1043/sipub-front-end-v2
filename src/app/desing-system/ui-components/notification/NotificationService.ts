// notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  description?: string;
  icon?: string;
  duration: number;
  onComplete?: () => void; // Callback opcional para acionar ao final do tempo
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<NotificationData[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  // Função simples para gerar um ID único
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private addNotification(notification: NotificationData): void {
    const current = this.notificationsSubject.getValue();
    this.notificationsSubject.next([...current, notification]);

    // Após o tempo de duração, remove a notificação e executa o callback, se existir
    setTimeout(() => {
      this.removeNotification(notification.id);
      if (notification.onComplete) {
        notification.onComplete();
      }
    }, notification.duration);
  }

  private removeNotification(id: string): void {
    const current = this.notificationsSubject.getValue();
    this.notificationsSubject.next(current.filter(n => n.id !== id));
  }

  showSuccess(title: string, duration: number = 5000, description?: string, icon?: string, onComplete?: () => void): void {
    const notification: NotificationData = {
      id: this.generateId(),
      type: 'success',
      title,
      description,
      icon,
      duration,
      onComplete
    };
    this.addNotification(notification);
  }

  showError(title: string, duration: number = 5000, description?: string, icon?: string, onComplete?: () => void): void {
    const notification: NotificationData = {
      id: this.generateId(),
      type: 'error',
      title,
      description,
      icon,
      duration,
      onComplete
    };
    this.addNotification(notification);
  }

  showWarning(title: string, duration: number = 5000, description?: string, icon?: string, onComplete?: () => void): void {
    const notification: NotificationData = {
      id: this.generateId(),
      type: 'warning',
      title,
      description,
      icon,
      duration,
      onComplete
    };
    this.addNotification(notification);
  }

  showInfo(title: string, duration: number = 5000, description?: string, icon?: string, onComplete?: () => void): void {
    const notification: NotificationData = {
      id: this.generateId(),
      type: 'info',
      title,
      description,
      icon,
      duration,
      onComplete
    };
    this.addNotification(notification);
  }

  dismissNotification(id: string): void {
    this.removeNotification(id);
  }
}
