import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Optional, Output, Self } from '@angular/core';
import { Module } from 'app/core/interfaces/module.interface';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-module-dropdown',
  templateUrl: './module-dropdown.component.html',
  styleUrls: ['./module-dropdown.component.css'],
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  providers: [    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ModuleDropdownComponent),
        multi: true,
      },
      {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => ModuleDropdownComponent),
        multi: true,
      }]
})
export class ModuleDropdownComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() modules: Module[] = [];
  @Input() disabled = false;
  @Input() control!: AbstractControl;
  
  isOpen = false;

  selectedModule: Module | null = null; 

  private controlSubscription!: Subscription;


  toggleDropdown() {
    if (!this.disabled) { 
      this.isOpen = !this.isOpen;
    }
  }

  toggleSelection(module: Module) {
    if (this.disabled) return;
    const next = this.selectedModule?.id === module.id ? null : module;
    this.selectedModule = next;
    this.writeValue(module);
    this.onChange(next?.id ?? null);
    this.onTouched();
    this.isOpen = false;
  }
  
  ngOnInit(): void {
    this.controlSubscription = this.control.valueChanges.subscribe(value => {
      if (value === '' || value === null) {
        this.clearSelection();
      }
    });
  }

  private clearSelection(): void {
    this.selectedModule = null;
    this.isOpen = false;

  }

  get showErrorContainer(): boolean {
    return this.control ? this.control.invalid : false;
  }

  
  ngOnDestroy(): void {
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe();
    }
  }

  writeValue(module: Module): void {
    if (module === null || module === undefined) {
      this.control.setValue(null, { emitEvent: false });
      this.clearSelection();
    } else {
      this.control.setValue(this.selectedModule);
    }
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
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
}
