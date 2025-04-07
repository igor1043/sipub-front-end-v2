import { Component, Input, forwardRef, Self, Optional, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ControlValueAccessor, NgControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dropdown-checkbox',
  templateUrl: './dropdown-checkbox.component.html',
  styleUrls: ['./dropdown-checkbox.component.css'],
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
})
export class DropdownCheckboxComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() placeholder: string = 'Selecione os itens';
  @Input() alertText: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() options: { id: any, name: string }[] = [];
  @Input() control!: AbstractControl;
  @Input() minItemsForScroll: number = 5;
  @Input() maxDisplayItems: number = 2;

  displayText: string = '';
  searchTerm: string = '';
  filteredOptions: { id: any, name: string }[] = [];
  isDropdownVisible: boolean = false;
  isFocused: boolean = false;
  selectedIds: Set<any> = new Set();
  private clickInsideDropdown: boolean = false;

  private controlSubscription!: Subscription;

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (!this.isClickInsideComponent(event)) {
      this.closeDropdown();
    }
  }

  private isClickInsideComponent(event: MouseEvent): boolean {
    const target = event.target as HTMLElement;
    return target.closest('.input-container') !== null;
  }

  ngOnInit(): void {
    this.filterOptions();
    if (this.ngControl && this.ngControl.control) {
      this.controlSubscription = this.ngControl.control.valueChanges.subscribe(value => {
        if (value === '' || value === null || (Array.isArray(value) && value.length === 0)) {
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

  private closeDropdown(): void {
    this.isDropdownVisible = false;
    this.isFocused = false;
    this.onTouched();
  }

  private clearSelection(): void {
    this.selectedIds.clear();
    this.updateDisplayText();
    this.filterOptions();
  }

  get showErrorContainer(): boolean {
    return this.control ? this.control.invalid && this.control.touched : false;
  }

  writeValue(ids: any[]): void {
    if (ids && Array.isArray(ids)) {
      this.selectedIds = new Set(ids);
      this.updateDisplayText();
      this.filterOptions();
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
    this.filterOptions();
    this.isDropdownVisible = true;
  }

  onFocus(): void {
    this.isFocused = true;
    this.isDropdownVisible = true;
    this.filterOptions();
  }

  onBlur(): void { }

  filterOptions(): void {
    this.filteredOptions = this.options.filter(option =>
      option.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleOption(option: { id: any, name: string }, event: MouseEvent): void {
    event.stopPropagation();
    
    if (this.selectedIds.has(option.id)) {
      this.selectedIds.delete(option.id);
    } else {
      this.selectedIds.add(option.id);
    }
    
    this.updateDisplayText();
    this.propagateChange();
  }

  isSelected(id: any): boolean {
    return this.selectedIds.has(id);
  }

  private updateDisplayText(): void {
    const selectedOptions = this.options.filter(opt => this.selectedIds.has(opt.id));
    
    if (selectedOptions.length === 0) {
      this.displayText = '';
      return;
    }

    const displayedNames = selectedOptions
      .slice(0, this.maxDisplayItems)
      .map(opt => opt.name);
    
    this.displayText = displayedNames.join(', ');
    
    if (selectedOptions.length > this.maxDisplayItems) {
      this.displayText += ` +${selectedOptions.length - this.maxDisplayItems}`;
    }
  }

  private propagateChange(): void {
    const selectedArray = Array.from(this.selectedIds);
    this.onChange(selectedArray);
    
    if (this.control) {
      this.control.setValue(selectedArray);
      this.control.markAsTouched();
      this.control.updateValueAndValidity();
    }
  }

  shouldLabelFloat(): boolean {
    return this.isFocused || this.selectedIds.size > 0 || !!this.searchTerm;
  }

  hasScroll(): boolean {
    return this.filteredOptions.length >= this.minItemsForScroll;
  }

  get dropdownMaxHeight(): string {
    const itemHeight = 36;
    return `${this.minItemsForScroll * itemHeight}px`;
  }

  private onChange: any = (value: any[]) => {};
  private onTouched: any = () => {};
}