import { Component, Input, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

type SpinnerType = 'classic' | 'dots' | 'bars' | 'pulse' | 'progress' | 'custom';
type SpinnerSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnChanges {
  @Input() type: SpinnerType = 'classic';
  @Input() size: SpinnerSize = 'xsmall';
  @Input() color: string = 'var(--color-primary, #3f51b5)';
  @Input() secondaryColor: string = 'var(--color-background, #f5f5f5)';
  @Input() thickness: string = '2px';
  @Input() speed: number = 1;
  @Input() customClass: string = '';

  private sizeMap: Record<SpinnerSize, string> = {
    xsmall: '1rem',
    small: '1.5rem',
    medium: '2rem',
    large: '3rem',
    xlarge: '4rem'
  };

  @HostBinding('class') get class() {
    return this.customClass;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['speed']) {
      this.updateAnimationSpeed();
    }
  }

  private updateAnimationSpeed() {
    const styleTag = document.createElement('style');
    styleTag.id = 'spinner-speed-override';
    styleTag.innerHTML = `
      .spinner-classic { animation-duration: ${1 / this.speed}s !important; }
      .dot { animation-duration: ${1.4 / this.speed}s !important; }
      .bar { animation-duration: ${1.2 / this.speed}s !important; }
      .progress-bar { animation-duration: ${2 / this.speed}s !important; }
      .spinner-pulse { animation-duration: ${1.5 / this.speed}s !important; }
    `;
    
    const existingStyle = document.getElementById('spinner-speed-override');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    document.head.appendChild(styleTag);
  }

  getSpinnerStyle(): string {
    const calculatedSize = this.sizeMap[this.size] || this.sizeMap['xsmall'];
    const baseStyle = `width: ${calculatedSize}; height: ${calculatedSize};`;

    switch (this.type) {
      case 'classic':
        return `${baseStyle} border-width: ${this.thickness}; border-color: ${this.secondaryColor}; border-top-color: ${this.color};`;
      case 'dots':
        return baseStyle;
      case 'bars':
        return `${baseStyle} height: ${calculatedSize};`;
      case 'pulse':
        return `${baseStyle} background-color: ${this.color};`;
      case 'progress':
        return `${baseStyle} background-color: ${this.secondaryColor};`;
      case 'custom':
        return baseStyle;
      default:
        return baseStyle;
    }
  }

  getDotStyle(index: number): string {
    const calculatedSize = this.sizeMap[this.size] || this.sizeMap['xsmall'];
    return `width: calc(${calculatedSize} / 3); height: calc(${calculatedSize} / 3); background-color: ${this.color};`;
  }

  getBubbleStyle(index: number): string {
    const calculatedSize = this.sizeMap[this.size] || this.sizeMap['xsmall'];
    const size = `calc(${calculatedSize} / ${index + 2})`;
    return `width: ${size}; height: ${size}; background-color: ${this.color}; border-radius: 50%;`;
  }

  getBarStyle(index: number): string {
    const calculatedSize = this.sizeMap[this.size] || this.sizeMap['xsmall'];
    return `width: calc(${calculatedSize} / 5); height: 100%; background-color: ${this.color};`;
  }

  getProgressStyle(): string {
    return `background-color: ${this.color}; width: 50%;`;
  }
}