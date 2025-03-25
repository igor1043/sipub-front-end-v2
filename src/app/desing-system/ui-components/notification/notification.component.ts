import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

export interface NotificationData {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  icon?: string;
  duration: number,
}

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData,
    private snackBarRef: MatSnackBarRef<NotificationComponent>
  ) {}

  dismiss(): void {
    this.snackBarRef.dismiss();
  }
}