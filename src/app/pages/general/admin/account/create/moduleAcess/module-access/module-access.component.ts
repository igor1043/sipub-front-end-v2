import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { modules } from 'app/core/interfaces/module.interface';
import { TextComponent } from "../../../../../../../desing-system/ui-components/text/text.component";
import { SvgIconComponent } from "../../../../../../../desing-system/ui-components/svg-icon/svg-icon.component";
import { SwitchItemComponent } from "../../../../../../../desing-system/ui-components/switch/switch-item.component";

@Component({
  selector: 'app-module-access',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextComponent, SvgIconComponent, SwitchItemComponent],
  templateUrl: './module-access.component.html',
  styleUrls: ['./module-access.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }] 
})
export class ModuleAccessComponent {
  @Input() moduleId!: number;
  @Input() controlName!: string;  

  getModuleInfoById(id: number): { name: string, iconUrl: string } | null {
    const module = modules.find((mod) => mod.id === id);
    return module ? { name: module.name, iconUrl: module.iconUrl } : null;
  }
}
