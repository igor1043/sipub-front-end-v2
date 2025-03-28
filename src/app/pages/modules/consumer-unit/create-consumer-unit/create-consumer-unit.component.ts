import { Component, inject } from '@angular/core';
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
import { MapPickerComponent } from 'app/desing-system/ui-components/map-picker/map-picker.component';
import { firstValueFrom } from 'rxjs';
import { AccountService } from 'app/core/services/account/account.service';
import { AccountResponse } from 'app/core/services/account/models/account.model';
import { Account } from 'app/core/interfaces/account.interface';
import { AccountsMockService } from 'app/core/mocks/accounts.mock';
import { NotificationService } from 'app/desing-system/ui-components/notification/NotificationService';
import { LoadingComponent } from "../../../../desing-system/ui-components/loading/loading.component";
import { NotificationComponent } from "../../../../desing-system/ui-components/notification/notification.component";


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
    MapPickerComponent,
    LoadingComponent,
    NotificationComponent
],
  templateUrl: './create-consumer-unit.component.html',
  styleUrls: ['./create-consumer-unit.component.css']
})
export class CreateConsumerUnitComponent {
  //mocks
    private accountsMock = inject(AccountsMockService);

    
  form: FormGroup;

  isLoading = false;

  listAccounts: Account[] = []
  selectedAccount: Account | null = null;


  accounts: Account[] = [];

  ngOnInit(): void {
    this.getListAccount();
  }

  constructor(private fb: FormBuilder, private accountService: AccountService, private notificationService: NotificationService) {
    this.form = this.fb.group({
      selected_account: [null, Validators.required],
      name_consumer_unit: ['', [Validators.required, Validators.minLength(1)]],
      class_consumer_unit: [null, [Validators.required]],
      type_supply: [''],
      images: [''],
      location: [''],
      street: [''],
      neiborhood: [''],

    });


    this.form.get('selected_account')?.valueChanges.subscribe(contaId => {
      this.selectedAccount = this.listAccounts.find(a => a.id === contaId) || null;

      if (contaId) {
        //this.carregarListaUnidadeConsumidora(contaId);
      }
    });
  
  }

  isValidAccount = (control: FormControl) => {
    const inputName = control.value;
    const isValid = this.listAccounts.some(account => account.name.toLowerCase() === inputName);

    console.log('Input value:', inputName, 'List of account names:', this.listAccounts);

    return isValid ? null : { invalidAccount: true };
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

  onOptionSelected(selectedOption: { id: number; name: string }) {
    console.log('Opção selecionada:', selectedOption);
    // Aqui você pode fazer algo com a opção selecionada, como atualizar o formulário
  }


  private getListAccount(): void {
    this.isLoading = true;
    this.accountsMock.getAccounts().subscribe({
      next: (listAccounts) => {
        this.listAccounts = listAccounts;
        this.isLoading = false;
      },
      error: (erro) => {
        this.isLoading = false;
        this.notificationService.showError(
          'Erro ao carregar a lista de contas',
          7000,
          'Recarregue a página e tente novamente',
          undefined,
          () => {}
        );
      }
    });
  }
  get accountOptions(): { id: number, name: string }[] {
    return this.listAccounts.map(account => ({
      id: account.id,
      name: account.name 
    }));
  }
}
