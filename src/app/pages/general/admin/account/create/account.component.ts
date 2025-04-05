import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from "../../../../../desing-system/ui-components/inputs/input-text/input-text.component";
import { TextComponent } from "../../../../../desing-system/ui-components/text/text.component";
import { SingleImageUploadComponent } from "../../../../../desing-system/ui-components/upload-images/single-image-upload/single-image-upload.component";
import { SwitchItemComponent } from "../../../../../desing-system/ui-components/switch/switch-item.component";
import { DividerComponent } from "../../../../../desing-system/ui-components/divider/divider.component";
import { ButtonComponent } from "../../../../../desing-system/ui-components/button/button.component";
import { ModuleAccessComponent } from "./moduleAcess/module-access/module-access.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextComponent,
    TextComponent,
    SingleImageUploadComponent,
    SwitchItemComponent,
    DividerComponent,
    ButtonComponent,
    ModuleAccessComponent,
    CommonModule
],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{
  form: FormGroup;
  modulesList: any[] = [{id:1, status: false}, {id:2, status: false}];

  ngOnInit() {
    this.loadModules(this.modulesList);
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      account_access: [''],
      cnpj: [''],
      billing: [false],
      city_hall: [false],
      administrators: [false],
      uploaded_image: [''],
      modules: this.fb.group({}), 
    });
  }

  loadModules(modulesData: { id: number, status: boolean }[]) {
    this.modulesList = modulesData;
    const modulesGroup = this.form.get('modules') as FormGroup;
    modulesData.forEach(module => {
      modulesGroup.addControl(
        module.id.toString(),
        this.fb.control(module.status)
      );
    });
  }

  onSubmit() {
    const formValue = this.form.value;
    const modules = Object.keys(formValue.modules).map(idStr => ({
      id: +idStr,
      status: formValue.modules[idStr]
    }));
    console.log(modules);
  }
}