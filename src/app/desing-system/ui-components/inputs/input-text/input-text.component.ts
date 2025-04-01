import { Component, forwardRef, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  standalone: true,
  imports: [CommonModule, SvgIconComponent, NgxMaskDirective],
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor, Validator, OnInit {
  @Input() placeholder: string = '';
  @Input() alertText: string = '';
  isRequired: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: string = 'text';
  @Input() typeMask: 'cpf' | 'cnpj' | 'phone' | '' = '';
  @Input() disabled: boolean = false;
  @Input() onlyNumbers: boolean = false;
  @Input() control!: AbstractControl;

  value: any = '';
  onChange: any = () => {};
  onTouched: any = () => {};
  isFocused: boolean = false; 

  ngOnInit() {
    if (!this.isRequired && this.control && this.control.validator) {
      const validationResult = this.control.validator(new FormControl());
      if (validationResult && validationResult['required']) {
        this.isRequired = true;
      }
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
    this.disabled = isDisabled;
  }

  validate(control: FormControl) {
    if (this.isRequired) {
      let currentValue = control.value || '';
      
      if (this.onlyNumbers || this.typeMask) {
        currentValue = currentValue.toString().replace(/\D/g, '');
      }

      if (currentValue === '') {
        return { required: true };
      }
    }
    return null;
  }

  onInputChange(event: any): void {
    if (this.disabled) return;
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  onFocus(): void {
    this.isFocused = true;
    this.onTouched();
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }

  shouldLabelFloat(): boolean {
    return !!this.value || this.isFocused;
  }

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

  get specialCharacters(): string[] {
    switch (this.typeMask) {
      case 'cpf':
        return ['.', '.', '-'];
      case 'cnpj':
        return ['.', '.', '/', '-'];
      case 'phone':
        return ['(', ')', ' ', '-'];
      default:
        return [];
    }
  }
}
