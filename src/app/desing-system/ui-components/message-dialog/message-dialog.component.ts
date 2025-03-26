import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export enum DialogType {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning'
}

@Component({
  selector: 'app-message-dialog',
  imports : [CommonModule, MatIconModule],
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() positiveButtonLabel: string = 'OK';
  @Input() negativeButtonLabel: string = 'Cancelar';
  @Input() type: DialogType = DialogType.INFO;
  
  @Output() positiveButtonClick = new EventEmitter<void>();
  @Output() negativeButtonClick = new EventEmitter<void>();
  
  isVisible: boolean = false;

  constructor() { }

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  onPositiveClick() {
    this.positiveButtonClick.emit();
    this.close();
  }

  onNegativeClick() {
    this.negativeButtonClick.emit();
    this.close();
  }

  get dialogClass() {
    return {
      'success-dialog': this.type === DialogType.SUCCESS,
      'info-dialog': this.type === DialogType.INFO,
      'error-dialog': this.type === DialogType.ERROR,
      'warning-dialog': this.type === DialogType.WARNING
    };
  }

  get iconName() {
    switch(this.type) {
      case DialogType.SUCCESS: return 'check_circle';
      case DialogType.INFO: return 'info';
      case DialogType.ERROR: return 'error';
      case DialogType.WARNING: return 'warning';
      default: return 'info';
    }
  }
}