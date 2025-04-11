import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextComponent } from "../../../../../../../desing-system/ui-components/text/text.component";
import { SvgIconComponent } from "../../../../../../../desing-system/ui-components/svg-icon/svg-icon.component";
import { SwitchItemComponent } from "../../../../../../../desing-system/ui-components/switch/switch-item.component";
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';
import { modules } from 'app/core/interfaces/module.interface';

@Component({
  selector: 'app-module-access',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextComponent, SvgIconComponent, SwitchItemComponent],
  templateUrl: './module-access.component.html',
  styleUrls: ['./module-access.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }] 
})
export class ModuleAccessComponent implements OnInit {
  @Input() moduleId!: number;
  @Input() controlName!: string;  

  availableModuleIds: number[] = [];

  constructor(private localStorageService: LocalStorageService) {}
  
  ngOnInit() {
    this.availableModuleIds = this.localStorageService.getAvailableModules();
  }

  getModuleInfoById(id: number): { name: string, iconUrl: string } | null {
    const module = modules.find((mod) => mod.id === id);
    return module ? { name: module.name, iconUrl: module.iconUrl } : null;
  }

  isModuleAvailable(): boolean {
    return this.availableModuleIds.includes(this.moduleId);
  }
}
