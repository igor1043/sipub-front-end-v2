import { Component, forwardRef, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Subscription } from 'rxjs';

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
export class InputTextComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {
  @Input() placeholder: string = '';
  @Input() alertText: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: string = 'text';
  @Input() typeMask: 'cpf' | 'cnpj' | 'phone' | '' = '';
  @Input() onlyNumbers: boolean = false;
  @Input() control!: AbstractControl;
  disabled: boolean = false;

  value: any = '';
  onChange: any = () => { };
  onTouched: any = () => { };
  isFocused: boolean = false;

  private controlSubscription!: Subscription;
  @ViewChild('inputText', { static: false }) inputText!: ElementRef;

  ngOnInit() {
    if (this.control) {
      this.controlSubscription = this.control.valueChanges.subscribe(value => {
        if (value === '' || value === null) {
          this.writeValue('');
          this.control.setValue('', { emitEvent: false });
  
          setTimeout(() => {
            if (this.inputText && this.inputText.nativeElement) {
              this.inputText.nativeElement.value = '';
            }
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe();
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
    if (this.onlyNumbers || this.typeMask) {
      let currentValue = control.value || '';
      currentValue = currentValue.toString().replace(/\D/g, '');
      if (currentValue === '') {
        return { required: true };
      }
    }
    return null;
  }

  get showErrorContainer(): boolean {
    return this.control ? this.control.invalid : false;
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
