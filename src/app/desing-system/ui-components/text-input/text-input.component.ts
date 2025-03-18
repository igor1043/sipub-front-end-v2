import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextInputComponent),
    multi: true
  }]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() maskType: 'phone' | 'cpf' | 'number' | 'text' = 'text';
  @Output() valueChange = new EventEmitter<string>();

  value: string = '';
  isFocused: boolean = false;

  onChange: any = () => { };
  onTouched: any = () => { };

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const maskedValue = this.applyMask(value);
    this.value = maskedValue;
    this.onChange(maskedValue);
    this.valueChange.emit(maskedValue);
  }

  private applyMask(value: string): string {
    switch (this.maskType) {
      case 'phone':
        return this.formatPhone(value);
      case 'cpf':
        return this.formatCPF(value);
      case 'number':
        return this.formatNumber(value);
      default:
        return value;
    }
  }

  private formatPhone(value: string): string {
    value = value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (value.length > 11) value = value.substring(0, 11); // Limita a 11 caracteres
    return value
      .replace(/^(\d{2})(\d)/g, '($1) $2') // Formata DDD
      .replace(/(\d{5})(\d)/, '$1-$2'); // Formata número
  }

  private formatCPF(value: string): string {
    value = value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (value.length > 11) value = value.substring(0, 11); // Limita a 11 caracteres
    return value
      .replace(/(\d{3})(\d)/, '$1.$2') // Formata os primeiros 3 dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Formata os próximos 3 dígitos
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Formata os últimos dígitos
  }

  private formatNumber(value: string): string {
    return value.replace(/\D/g, ''); // Remove tudo que não é dígito
  }

  // Implementação ControlValueAccessor
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implementar se necessário
  }
}