import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CheckboxItem {
  id: string | number;
  name: string;
  value: any;
}

@Component({
  selector: 'app-checkbox-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxListComponent),
      multi: true
    }
  ]
})
export class CheckboxListComponent implements ControlValueAccessor, Validator {
  /** itens a exibir */
  @Input() items: CheckboxItem[] = [];
  /** se false, permite apenas 1 seleção; se true, várias */
  @Input() multiple: boolean = true;
  /** validação required */
  @Input() isRequired: boolean = false;
  /** desabilita todo o componente */
  @Input() disabled: boolean = false;

  /** estado interno de seleção múltipla */
  selectedValues: any[] = [];
  /** estado interno de seleção única */
  selectedValue: any = null;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  @Input() size: 'small' | 'medium' | 'large' = 'medium'; // Tamanho 

  writeValue(value: any): void {
    if (this.multiple) {
      this.selectedValues = Array.isArray(value) ? value : [];
    } else {
      this.selectedValue = value;
    }
    // propaga para ngModel/forms
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

  validate(control: AbstractControl): ValidationErrors | null {
    const val = control.value;
    if (this.isRequired) {
      if (this.multiple) {
        if (!Array.isArray(val) || val.length === 0) {
          return { required: true };
        }
      } else {
        if (val == null || val === '') {
          return { required: true };
        }
      }
    }
    return null;
  }

  /** checa se um valor está selecionado */
  isSelected(value: any): boolean {
    return this.multiple
      ? this.selectedValues.includes(value)
      : this.selectedValue === value;
  }

  /** dispara quando o usuário clica no checkbox */
  onSelectionChange(value: any, checked: boolean): void {
    if (this.disabled) {
      return;
    }

    if (this.multiple) {
      if (checked) {
        this.selectedValues = [...this.selectedValues, value];
      } else {
        this.selectedValues = this.selectedValues.filter(v => v !== value);
      }
      this.onChange(this.selectedValues);
    } else {
      if (checked) {
        this.selectedValue = value;
        this.onChange(this.selectedValue);
      } else {
        // se desmarcar o único selecionado, zera
        this.selectedValue = null;
        this.onChange(null);
      }
    }

    this.onTouched();
  }
}
