import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox-item.component.html',
  styleUrls: ['./checkbox-item.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxItemComponent),
      multi: true
    }
  ]
})
export class CheckboxItemComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() value: any;
  @Input() selectedValues: any[] = [];
  @Input() isMultiple: boolean = true;
  @Input() disabled: boolean = false;

  isChecked: boolean = false;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  writeValue(val: any): void {
    if (this.isMultiple) {
      this.isChecked = Array.isArray(val) && val.includes(this.value);
    } else {
      this.isChecked = val === this.value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  onToggle(): void {
    if (this.disabled) return;

    this.isChecked = !this.isChecked;

    if (this.isMultiple) {
      const updated = this.isChecked
        ? [...(this.selectedValues || []), this.value]
        : (this.selectedValues || []).filter(v => v !== this.value);

      this.onChange(updated);
    } else {
      this.onChange(this.isChecked ? this.value : null);
    }

    this.onTouched();
  }
}
