import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../desing-system/ui-components/button/button.component';
import { SwitchComponent } from 'app/desing-system/ui-components/switch/switch.component';
import { TabsComponent } from 'app/desing-system/ui-components/tabs/tabs.component';
import { TextComponent } from 'app/desing-system/ui-components/text/text.component';
import { DividerComponent } from 'app/desing-system/ui-components/divider/divider.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from 'app/desing-system/ui-components/inputs/input-text/input-text.component';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

export class CreateConsumerUnitModule { }
@Component({
  selector: 'app-create-consumer-unit',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    FormsModule,
    SwitchComponent,
    TabsComponent,
    TextComponent,
    DividerComponent,
    InputTextComponent
  ],
  templateUrl: './create-consumer-unit.component.html',
  styleUrls: ['./create-consumer-unit.component.css'] // Corrigido: styleUrls em vez de styleUrl
})
export class CreateConsumerUnitComponent {
  form: FormGroup;
unitName: any;

  constructor(private fb: FormBuilder) {
    // Inicializa o formulário
    this.form = this.fb.group({
      unitName: ['', Validators.required], // Nome da unidade (obrigatório)

    });
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
}
