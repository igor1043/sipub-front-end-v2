import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from "../button/button.component";
import { TextComponent } from "../text/text.component";
import { SvgIconComponent } from "../svg-icon/svg-icon.component";

export enum DialogType {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning'
}

@Component({
  selector: 'app-message-dialog',
  imports: [CommonModule, MatIconModule, ButtonComponent, TextComponent, SvgIconComponent],
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

  get iconPath() {
    const basePath = '/assets/icons/';
    switch(this.type) {
      case DialogType.SUCCESS: return `${basePath}ic_success.svg`;
      case DialogType.INFO: return `${basePath}ic_warning_2.svg`;
      case DialogType.ERROR: return `${basePath}ic_error.svg`;
      case DialogType.WARNING: return `${basePath}ic_warning_2.svg`;
      default: return `${basePath}ic_warning_2.svg`;
    }
  }

  get typeColor() {
    switch(this.type) {
      case DialogType.SUCCESS: return `var(--green-500)`;
      case DialogType.INFO: return `var(--blue-500)`;
      case DialogType.ERROR: return `var(--red-500)`;
      case DialogType.WARNING: return `var(--orange-500)`;
      default: return `var(--gray-500)`;
    }
  }

  get typeColor200() {
    switch(this.type) {
      case DialogType.SUCCESS: return `var(--green-200)`;
      case DialogType.INFO: return `var(--blue-200)`;
      case DialogType.ERROR: return `var(--red-200)`;
      case DialogType.WARNING: return `var(--orange-100)`;
      default: return `var(--gray-200)`;
    }
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
      case DialogType.WARNING: return 'warning_2';
      default: return 'info';
    }
  }
  
}
