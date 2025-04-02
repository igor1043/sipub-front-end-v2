import { Component, Input, forwardRef, Self, Optional, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NgControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
})
export class DropdownComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() placeholder: string = '';
  @Input() alertText: string = '';
  @Input() isRequired: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() options: { id: any, name: string }[] = [];
  @Input() control!: AbstractControl;
  @Input() minItemsForScroll: number = 5; 

  displayText: string = '';
  searchTerm: string = '';
  filteredOptions: { id: any, name: string }[] = [];
  isDropdownVisible: boolean = false;
  isFocused: boolean = false;
  selectedId: any = null;

  private controlSubscription!: Subscription;

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.ngControl && this.ngControl.control) {
      this.controlSubscription = this.ngControl.control.valueChanges.subscribe(value => {
        if (value === '' || value === null) {
          this.clearSelection();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe();
    }
  }

  private clearSelection(): void {
    this.selectedId = null;
    this.displayText = '';
    this.searchTerm = '';
    this.filterOptions();
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
      this.onChange(null);
      if (this.control) {
        this.control.setValue(null);
        this.control.markAsTouched();
        this.control.updateValueAndValidity();
      }
    } else {
      this.selectedId = option.id;
      this.displayText = option.name;
      this.onChange(option.id);
      if (this.control) {
        this.control.setValue(option.id);
        this.control.markAsTouched();
        this.control.updateValueAndValidity();
      }
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

  private onChange: any = () => { };
  private onTouched: any = () => { };
}