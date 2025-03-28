import { Component, Input, Self, Optional, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatDatepickerInputEvent, MatDatepicker } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SvgIconComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true
    }
  ]
})
export class InputDateComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() alertText: string = '';
  @Input() isRequired: boolean = false;
  @Input() currentValue: string | null = null;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() control!: AbstractControl;

  @ViewChild('picker') picker!: MatDatepicker<Date>;

  value: Date | null = null;
  isFocused: boolean = false;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('pt-BR');
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: string): void {
    if (value) {
      const dateParts = value.split('/');
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);
        this.value = new Date(year, month, day);
      } else {
        this.value = null;
      }
    } else {
      this.value = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.value = event.value;
    if (this.value) {
      const formattedDate = this.formatDate(this.value);
      this.onChange(formattedDate);
      this.control?.setValue(formattedDate);
    } else {
      this.onChange(null);
      this.control?.setValue(null);
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onFocus(): void {
    this.isFocused = false;
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }

  shouldLabelFloat(): boolean {
    return this.isFocused || !!this.value;
  }

  onInputClick(): void {
    if (this.value) {
      this.value = null;
      this.onChange(null);
      this.control?.setValue(null);
    } else {
      this.picker.open();
    }
  }

  onTouched = () => { };
  onChange: any = () => { };
}