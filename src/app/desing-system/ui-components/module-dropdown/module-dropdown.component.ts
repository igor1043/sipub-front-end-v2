import { Component, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self } from '@angular/core';
import { Module } from 'app/core/interfaces/module.interface';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-module-dropdown',
  templateUrl: './module-dropdown.component.html',
  styleUrls: ['./module-dropdown.component.css'],
  imports: [CommonModule, SvgIconComponent],
})
export class ModuleDropdownComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() modules: Module[] = [];
  @Input() selectedModule: Module | null = null; // Novo input para valor selecionado
  @Input() disabled = false;
  @Input() control!: AbstractControl;
  @Output() selectedModuleChange = new EventEmitter<Module | null>();

  isOpen = false;

  private controlSubscription!: Subscription;

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  toggleDropdown() {
    if (!this.disabled) { // Só permite abrir se não estiver desabilitado
      this.isOpen = !this.isOpen;
    }
  }

  toggleSelection(module: Module) {
    if (this.disabled) return;
    const newSelection = this.selectedModule?.id === module.id ? null : module;
    this.selectedModule = newSelection;
    this.selectedModuleChange.emit(this.selectedModule);
    this.onChange(newSelection?.id || null);
  
    if (this.control) {
      this.control.updateValueAndValidity();
    }
  
    this.isOpen = false;
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

  private clearSelection(): void {
    this.selectedModule = null;
    this.isOpen = false;
    this.selectedModuleChange.emit(this.selectedModule);
  }

  get showErrorContainer(): boolean {
    return this.control ? this.control.invalid : false;
  }

  ngOnDestroy(): void {
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe();
    }
  }

  writeValue(id: any): void {
    if (id !== undefined && id !== null) {
      const selectedOption = this.modules.find(opt => opt.id === id);
      if (selectedOption) {
        console.log('Selected ModuleDropDown:', selectedOption, this.control.invalid);
        this.selectedModule = selectedOption;
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private onChange: any = () => { };
  private onTouched: any = () => { };
}
