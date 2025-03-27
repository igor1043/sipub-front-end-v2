import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationData, NotificationService } from './NotificationService';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  imports: [CommonModule]
})
export class NotificationComponent implements OnInit {
  notifications$: Observable<NotificationData[]>;

  constructor(private notificationService: NotificationService) {
    this.notifications$ = this.notificationService.notifications$;
  }

  // Remove manualmente a notificação clicada
  dismiss(id: string): void {
    this.notificationService.dismissNotification(id);
  }

  ngOnInit(): void {}
}
