import { Component, Input, forwardRef, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { AccountComponent } from "../../../../pages/general/admin/account/account.component";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  standalone: true,
  imports: [CommonModule, SvgIconComponent, AccountComponent],
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() alertText: string = '';
  @Input() isRequired: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() options: { id: any, name: string }[] = [];
  @Input() control!: AbstractControl;

  displayText: string = '';
  searchTerm: string = '';
  filteredOptions: { id: any, name: string }[] = [];
  isDropdownVisible: boolean = false;
  isFocused: boolean = false;
  selectedId: any = null;

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(id: any): void {
    if (id !== undefined && id !== null) {
      const selectedOption = this.options.find(opt => opt.id === id);
      if (selectedOption) {
        this.selectedId = id;
        this.displayText = selectedOption.name;
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.displayText = this.searchTerm;
    this.filterOptions();
    this.isDropdownVisible = true;
  
    if (!this.searchTerm) {
      this.onChange(null);
      if (this.control) {
        this.control.setValue(null);
        this.control.markAsTouched();
        this.control.updateValueAndValidity();
      }
    }
  }

  onFocus(): void {
    this.isFocused = true;
    this.isDropdownVisible = true;
    this.filterOptions();
  }

  onBlur(): void {
    this.isFocused = false;
    setTimeout(() => {
      this.isDropdownVisible = false;
      
      // Se não houver uma opção selecionada, limpar o valor e acionar a validação
      if (!this.selectedId) {
        this.displayText = '';
        this.onChange(null);
        if (this.control) {
          this.control.setValue(null);
          this.control.markAsTouched();
          this.control.updateValueAndValidity(); // Força a revalidação do campo
        }
      }
    }, 200);
    
    this.onTouched();
  }
  filterOptions(): void {
    this.filteredOptions = this.options.filter(option =>
      option.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectOption(option: { id: any, name: string }): void {
    if (this.selectedId === option.id) {
      // Se o usuário clicar na mesma opção, desmarca a seleção
      this.selectedId = null;
      this.displayText = '';
      this.onChange(null);
      if (this.control) {
        this.control.setValue(null);
        this.control.markAsTouched();
        this.control.updateValueAndValidity();
      }
    } else {
      // Seleciona a nova opção
      this.selectedId = option.id;
      this.displayText = option.name;
      this.onChange(option.id);
      if (this.control) {
        this.control.setValue(option.id);
        this.control.markAsTouched();
        this.control.updateValueAndValidity();
      }
    }
    
    this.isDropdownVisible = false; // Fecha o dropdown após a seleção
  }

  shouldLabelFloat(): boolean {
    return this.isFocused || !!this.displayText;
  }

  private onChange: any = () => {};
  private onTouched: any = () => {};
}