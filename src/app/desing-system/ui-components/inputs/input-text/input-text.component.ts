import { Component, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  standalone: true,
  imports: [CommonModule, SvgIconComponent, NgxMaskDirective],
  providers: [provideNgxMask()],
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() alertText: string = '';
  @Input() isRequired: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: string = 'text';
  @Input() control!: AbstractControl;
  @Input() typeMask: 'cpf' | 'cnpj' | 'phone' | '' = '';
  @Input() disabled: boolean = false;
  @Input() onlyNumbers: boolean = false;

  value: string = '';
  isFocused: boolean = false;

  formControlDisabled: boolean = false; 

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

  setDisabledState(isDisabled: boolean): void {
    this.formControlDisabled = isDisabled; // Implemented method
  }

  onInputChange(event: Event): void {
    if (this.formControlDisabled || this.disabled) return; // Optional safeguard

    let value = (event.target as HTMLInputElement).value;
    if (this.onlyNumbers) {
      value = value.replace(/\D/g, '');
    }
    this.value = value;
    this.onChange(value);
    this.control?.setValue(value);
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }

  shouldLabelFloat(): boolean {
    return this.isFocused || !!this.value;
  }

  onTouched = () => {};
  onChange: any = () => {};

  get mask(): string {
    switch (this.typeMask) {
      case 'cpf':
        return '000.000.000-00';
      case 'cnpj':
        return '00.000.000/0000-00';
      case 'phone':
        return '(00) 00000-0000';
      default:
        return '';
    }
  }
}