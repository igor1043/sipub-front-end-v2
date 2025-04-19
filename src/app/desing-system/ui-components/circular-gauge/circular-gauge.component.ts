import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-circular-gauge',
  templateUrl: './circular-gauge.component.html',
  styleUrls: ['./circular-gauge.component.css'],
  imports: [CommonModule]
})
export class CircularGaugeComponent implements OnChanges {
  @Input() value: number = 0; // valor de 0 a 100
  radius: number = 80;
  strokeWidth: number = 20;
  dashArray: number = 0;
  dashOffset: number = 0;

  ngOnChanges() {
    const angle = 260;
    const circumference = (Math.PI * this.radius * angle) / 180;
    this.dashArray = circumference;
    this.dashOffset = circumference * (1 - this.value / 100);
  }
}
