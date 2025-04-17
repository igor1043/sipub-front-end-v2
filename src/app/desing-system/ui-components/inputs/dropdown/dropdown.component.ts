import { Component, Input, forwardRef, Self, Optional, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { Subscription } from 'rxjs';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true,
  }]
})

export class DropdownComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() placeholder: string = '';
  @Input() alertText: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() options: { id: any, name: string }[] = [];
  @Input() control!: AbstractControl;
  @Input() disabled = false;
  @Input() minItemsForScroll: number = 5;

  displayText: string = '';
  selectedId: any = null;

  searchTerm: string = '';
  filteredOptions: { id: any, name: string }[] = [];
  isDropdownVisible: boolean = false;
  isFocused: boolean = false;

  private controlSubscription!: Subscription;

  ngOnInit(): void {

    if(this.control) {
      if(this.control.value !== null || this.control.value !== '') {
        this.writeValue(this.control.value)
        this.control.setValue(this.control.value, {emitEvent:false})
      }
      this.controlSubscription = this.control.valueChanges.subscribe(value => {
        if (value === '' || value === null) {
          this.writeValue('');
          this.control.setValue('', {emitEvent: false});
        }
      });
    }
  }

  validate(): { [key: string]: any } | null {
    if (this.control && this.control.invalid) {
      return { invalid: true };
    }
    return null;
  }

  get showErrorContainer(): boolean {
    return this.control ? this.control.invalid : false;
  }

  writeValue(id: any): void {
    this.selectedId = id;
  
    console.log("to aqui", id)
    const selectedOption = this.options.find(option => option.id === id);
    if (selectedOption) {
      console.log("to aqui selecionei a opção", id , selectedOption.name)
      this.displayText = selectedOption.name;
    } else {
      console.log("to aqui deixei em branco", id)
      this.displayText = '';
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
      if (!this.selectedId) {
        this.displayText = '';
        this.searchTerm = '';
        this.onChange(null);
        if (this.control) {
          this.control.setValue(null);
          this.control.markAsTouched();
          this.control.updateValueAndValidity();
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
      this.selectedId = null;
      this.displayText = '';
      this.control.setValue(null);
    } else {
      this.selectedId = option.id;
      this.displayText = option.name;
      this.control.setValue(option.id);
    }
    this.isDropdownVisible = false;
  }

  shouldLabelFloat(): boolean {
    return this.isFocused || !!this.displayText;
  }

  hasScroll(): boolean {
    return this.filteredOptions.length >= this.minItemsForScroll;
  }

  get dropdownMaxHeight(): string {
    const itemHeight = 36;
    return `${this.minItemsForScroll * itemHeight}px`;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe();
    }
  }
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };
}