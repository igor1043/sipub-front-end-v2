import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;
  @Input() error: string | null = null;
  @Output() retry = new EventEmitter<void>();

  handleRetry() {
    this.retry.emit();
  }
}