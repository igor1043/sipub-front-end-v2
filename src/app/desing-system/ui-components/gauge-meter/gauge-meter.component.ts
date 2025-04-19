import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauge-meter',
  templateUrl: './gauge-meter.component.html',
  styleUrls: ['./gauge-meter.component.scss']
})
export class GaugeMeterComponent implements OnInit {
  @Input() value = 0; // valor entre 0 e 100
  currentValue = 0;

  needleX = 100;
  needleY = 50; // Posição inicial mais alta (12 horas)

  ngOnInit() {
    this.animateNeedle();
  }

  animateNeedle() {
    const duration = 1000;
    const steps = 60;
    const increment = this.value / steps;
    let step = 0;

    const interval = setInterval(() => {
      this.currentValue += increment;
      if (this.currentValue >= this.value) {
        this.currentValue = this.value;
        clearInterval(interval);
      }
      this.updateNeedle();
    }, duration / steps);
  }

  updateNeedle() {
    const angle = (this.currentValue / 100) * 180 - 180;
    const radians = angle * (Math.PI / 180);
    const length = 40;
    this.needleX = 100 + length * Math.cos(radians);
    this.needleY = 100 + length * Math.sin(radians);
  }
}