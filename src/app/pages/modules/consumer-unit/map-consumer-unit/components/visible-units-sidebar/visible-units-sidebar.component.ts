import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConsumerUnit } from '../consumer-units-map/consumer-units-map.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-visible-units-sidebar',
  templateUrl: './visible-units-sidebar.component.html',
  styleUrls: ['./visible-units-sidebar.component.css'],
  imports: [CommonModule],
})
export class VisibleUnitsSidebarComponent {
  @Input() units: ConsumerUnit[] = [];
  @Input() show: boolean = true;
  @Output() unitSelected = new EventEmitter<ConsumerUnit>();

  onClick(unit: ConsumerUnit) {
    this.unitSelected.emit(unit);
  }
}
