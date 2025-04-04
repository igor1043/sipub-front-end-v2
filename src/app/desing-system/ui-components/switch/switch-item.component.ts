import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-switch-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './switch-item.component.html',
  styleUrls: ['./switch-item.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchItemComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SwitchItemComponent),
      multi: true
    }
  ]
})
export class SwitchItemComponent implements ControlValueAccessor, Validator {
  @Input() label: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() isRequired: boolean = false;
  @Input() disabled: boolean = false;

  isChecked: boolean = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: boolean): void {
    this.isChecked = value;
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: FormControl) {
    if (this.isRequired && !control.value) {
      return { required: true };
    }
    return null;
  }

  onToggle() {
    if (!this.disabled) {
      this.isChecked = !this.isChecked;
      this.onChange(this.isChecked);
      this.onTouched();
    }
  }
}