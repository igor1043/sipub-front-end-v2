import { Component } from '@angular/core';
import { SimpleTableComponent } from '../../../../desing-system/ui-components/tables/simple-table/simple-table.component';
import { PageEvent } from '@angular/material/paginator';
import { InputTextComponent } from "../../../../desing-system/ui-components/inputs/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, InputTextComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  form: FormGroup;

  ngOnInit(): void {

  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selected_account: ['', Validators.required],
      document_number: ['', Validators.required],
    });
  }


  // Método para atribuir valor programaticamente
  setAccountValue(value: string) {
    console.log('setei a conta', value);
    this.form.get('selected_account')?.setValue(value ?? '');
    this.form.get('document_number')?.setValue(value ?? '');
  }

  // Método para resetar o campo
  resetAccountField() {
    this.form.get('selected_account')?.reset();
    this.form.get('document_number')?.reset();
  }

  // Método para desabilitar/habilitar o campo
  toggleAccountFieldDisabled() {
    const control = this.form.get('document_number');
    if (control && control.disabled) {
      control.enable();
    } else {
      control?.disable();
    }
  }

}