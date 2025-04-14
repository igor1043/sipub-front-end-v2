import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Optional, Output, Self } from '@angular/core';
import { Module } from 'app/core/interfaces/module.interface';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-module-dropdown',
  templateUrl: './module-dropdown.component.html',
  styleUrls: ['./module-dropdown.component.css'],
  imports: [CommonModule, SvgIconComponent],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ModuleDropdownComponent),
    multi: true
  }]
})
export class ModuleDropdownComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() modules: Module[] = [];
  @Input() disabled = false;

  isOpen = false;
  selectedModule: Module | null = null; 
  private controlSub?: Subscription;

  private controlSubscription!: Subscription;

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }
  toggleDropdown() {
    if (!this.disabled) { 
      this.isOpen = !this.isOpen;
    }
  }

  toggleSelection(module: Module) {
    if (this.disabled) return;

    const next = this.selectedModule?.id === module.id ? null : module;
    this.selectedModule = next;
    this.onChange(next?.id ?? null);
    this.onTouched();
    this.isOpen = false;
  }
  
  ngOnInit(): void {
    if (this.ngControl?.control) {
      this.controlSub = this.ngControl.control.valueChanges
        .subscribe(value => {
          if (value === null || value === '') {
            this.clearSelection();
          }
        });
    }
  }


  private clearSelection(): void {
    this.selectedModule = null;
    this.isOpen = false;

  }

  get showErrorContainer(): boolean {
    const ctrl = this.ngControl?.control;
    return !!(ctrl && ctrl.invalid);
  }
  ngOnDestroy(): void {
    this.controlSub?.unsubscribe();
  }

  writeValue(id: any): void {
    if (id === null || id === undefined || id === '') {
      this.clearSelection();
    } else {
      const opt = this.modules.find(m => m.id === id);
      this.selectedModule = opt || null;
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
