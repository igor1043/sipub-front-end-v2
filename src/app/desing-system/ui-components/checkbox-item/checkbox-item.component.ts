import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox-item.component.html',
  styleUrls: ['./checkbox-item.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxItemComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxItemComponent),
      multi: true
    }
  ]
})
export class CheckboxItemComponent implements ControlValueAccessor, Validator {
  @Input() label: string = '';
  @Input() value: any;
  @Input() name: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() isRequired: boolean = false;
  @Input() disabled: boolean = false;
  @Input() mode: 'single' | 'multiple' = 'multiple'; // Modo de seleção

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

  onChangeHandler(event: Event) {
    if (!this.disabled) {
      const isChecked = (event.target as HTMLInputElement).checked;
      
      if (this.mode === 'single') {
        this.selectedValue = isChecked ? this.value : null;
      } else {
        // Modo múltiplo
        if (!this.selectedValue || !Array.isArray(this.selectedValue)) {
          this.selectedValue = [];
        }
        
        if (isChecked) {
          this.selectedValue = [...this.selectedValue, this.value];
        } else {
          this.selectedValue = this.selectedValue.filter((v: any) => v !== this.value);
        }
      }
      
      this.onChange(this.selectedValue);
      this.onTouched();
    }
  }

  isChecked(): boolean {
    if (this.mode === 'single') {
      return this.selectedValue === this.value;
    } else {
      return this.selectedValue && Array.isArray(this.selectedValue) 
        ? this.selectedValue.includes(this.value)
        : false;
    }
  }
}