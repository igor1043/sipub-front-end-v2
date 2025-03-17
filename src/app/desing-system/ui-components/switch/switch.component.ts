import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-switch',
  imports: [MatSlideToggleModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css'
})
export class SwitchComponent {
  @Input() label = '';
  @Input() color = 'primary';
  @Input() checked = false;
  @Output() toggleChanged = new EventEmitter<boolean>();

  onToggleChange(event: MatSlideToggleChange): void {
    this.checked = event.checked;
    this.toggleChanged.emit(event.checked);
  }
}
