import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../desing-system/ui-components/button/button.component';
import { SwitchComponent } from 'app/desing-system/ui-components/switch/switch.component';
import { TabsComponent } from 'app/desing-system/ui-components/tabs/tabs.component';
import { TextComponent } from 'app/desing-system/ui-components/text/text.component';
import { DividerComponent } from 'app/desing-system/ui-components/divider/divider.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from 'app/desing-system/ui-components/inputs/input-text/input-text.component';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from "../../../../desing-system/ui-components/inputs/dropdown/dropdown.component";
import { ImageUploadComponent } from 'app/desing-system/ui-components/image-upload/image-upload.component';
import { PdfUploadComponent } from 'app/desing-system/ui-components/pdf-upload/pdf-upload.component';


export class CreateConsumerUnitModule { }
@Component({
  selector: 'app-create-consumer-unit',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SwitchComponent,
    TabsComponent,
    TextComponent,
    DividerComponent,
    InputTextComponent,
    DropdownComponent,
    ImageUploadComponent,
    PdfUploadComponent
],
  templateUrl: './create-consumer-unit.component.html',
  styleUrls: ['./create-consumer-unit.component.css'] // Corrigido: styleUrls em vez de styleUrl
})
export class CreateConsumerUnitComponent {
  form: FormGroup;

// No componente pai
listaOpcoes = [
  { id: 1, name: 'Opção 1' },
  { id: 2, name: 'Opção 2' },
  { id: 3, name: 'Opção 3' }
];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      optionalField: [''],
      requiredField: ['', [Validators.required, Validators.minLength(3)]],
      batataField: ['', [this.batataValidator]],
      campo: [''],
      document: ['']
    });
  }
  
  batataValidator(control: FormControl) {
    return control.value === 'batata' ? null : { batata: true };
  }
  
  onToggle(event: any) {
    console.log(event);
  }

  onClickLogin() {
    if (this.form.valid) {
      console.log('Formulário válido:', this.form.value);
      // Aqui você pode enviar os dados para o servidor
    } else {
      console.log('Formulário inválido');
    }
  }
  onSubmit() {
    if (this.form.valid) {
      console.log('Formulário válido', this.form.value);
    } else {
      console.log('Formulário inválido');
    }
  }
}
