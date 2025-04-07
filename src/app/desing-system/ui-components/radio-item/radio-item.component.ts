import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radio-item.component.html',
  styleUrls: ['./radio-item.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioItemComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RadioItemComponent),
      multi: true
    }
  ]
})
export class RadioItemComponent implements ControlValueAccessor, Validator {
  @Input() label: string = '';
  @Input() value: any;
  @Input() name: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() isRequired: boolean = false;
  @Input() disabled: boolean = false;

  selectedValue: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.selectedValue = value;
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

  onSelect() {
    if (!this.disabled) {
      this.selectedValue = this.value;
      this.onChange(this.value);
      this.onTouched();
    }
  }

  isChecked(): boolean {
    return this.selectedValue === this.value;
  }
}