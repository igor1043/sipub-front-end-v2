import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-switch',
  imports: [CommonModule, FormsModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css'
})
export class SwitchComponent {
  @Input() label: string = '';
  @Input() isChecked: boolean = false;
  @Output() toggleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onToggle() {
    this.toggleChange.emit(this.isChecked);
  }
}
