import { Component, Input, forwardRef, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() alertText: string = '';
  @Input() isRequired: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: string = 'text';

  value: string = '';
  isFocused: boolean = false;

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }

  shouldLabelFloat(): boolean {
    return this.isFocused || !!this.value; // Flutua se estiver focado ou preenchido
  }

  onTouched = () => {};
  onChange: any = () => {};
}