import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Module } from 'app/core/interfaces/module.interface';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";

@Component({
  selector: 'app-module-dropdown',
  templateUrl: './module-dropdown.component.html',
  styleUrls: ['./module-dropdown.component.css'],
  imports: [CommonModule, SvgIconComponent],
})
export class ModuleDropdownComponent {

  @Input() modules: Module[] = [];
  @Input() selectedModule: Module | null = null; // Novo input para valor selecionado
  @Input() disabled = false; 
  @Output() selectedModuleChange = new EventEmitter<Module | null>();

  isOpen = false;

  toggleDropdown() {
    if (!this.disabled) { // Só permite abrir se não estiver desabilitado
      this.isOpen = !this.isOpen;
    }
  }

  toggleSelection(module: Module) {
    if (this.disabled) return;
    
    const newSelection = this.selectedModule?.id === module.id ? null : module;
    this.selectedModuleChange.emit(newSelection);
    this.isOpen = false;
  }

}
