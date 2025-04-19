import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-gauge-meter',
  templateUrl: './gauge-meter.component.html',
  styleUrls: ['./gauge-meter.component.scss']
})
export class GaugeMeterComponent implements OnChanges {
  @Input() value: number = 0;
  @Input() max: number = 30;

  rotation: number = 0;

  ngOnChanges() {
    const clampedValue = Math.min(this.value, this.max);
    this.rotation = (clampedValue / this.max) * 180 - 90;
  }
}
