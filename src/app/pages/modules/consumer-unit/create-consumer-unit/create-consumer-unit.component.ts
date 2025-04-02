import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../../desing-system/ui-components/button/button.component';
import { SwitchComponent } from 'app/desing-system/ui-components/switch/switch.component';
import { TabsComponent } from 'app/desing-system/ui-components/tabs/tabs.component';
import { TextComponent } from 'app/desing-system/ui-components/text/text.component';
import { DividerComponent } from 'app/desing-system/ui-components/divider/divider.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
import { CreateConsumerUnitMockService, Dependency } from 'app/core/mocks/consumer-unit/create.consumer.unit.mock';
import { ContainerInfoDateComponent } from "./components/container-info-date/container-info-date.component";

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
    NotificationComponent,
    ContainerInfoDateComponent
],
  templateUrl: './create-consumer-unit.component.html',
  styleUrls: ['./create-consumer-unit.component.css']
})
export class CreateConsumerUnitComponent {
  //mocks
  private accountsMock = inject(AccountsMockService);
  private createAccountMock = inject(CreateConsumerUnitMockService)


  form: FormGroup;

  isLoading = false;

  listAccounts: Account[] = []
  selectedAccount: Account | null = null;

  listClass: Dependency[] = []
  selectedClass: Dependency | null = null;

  listDocuments: Dependency[] = []
  selectedDocument: Dependency | null = null;
  documentPlaceholder: string = 'CPF/CNPJ';
  documentMask: '' | 'cpf' | 'cnpj' = '';

  listSubgroupTariff: Dependency[] = []
  selectedSubgroupTariff: Dependency | null = null;

  listModalities: Dependency[] = []
  selectedModality: Dependency | null = null;


  accounts: Account[] = [];

  ngOnInit(): void {
    this.getListAccount();
    this.getListClass();
    this.getSelectedDocument();
    this.getTariffGroup();
    this.getModalities();
  }

  constructor(private fb: FormBuilder, private accountService: AccountService, private notificationService: NotificationService) {
    this.form = this.fb.group({
      selected_account: ['', Validators.required],
      name_consumer_unit: ['', [Validators.required, Validators.minLength(3)]],
      selected_class: ['', Validators.required],
      selected_document: ['', Validators.required],
      document_number: ['', [Validators.required, this.documentValidator()]],
      client_code: ['', [Validators.required]],
      subgroup_tariff: ['', [Validators.required]],
      type_supply: [''],
      instalation_code: ['', [Validators.required]],
      modality: ['', [Validators.required]],
      switch_cip_cosip: [false],
      switch_consumer_is_active: [true],
      images: [''],
      created_user: ['', Validators.required],
      holder_phone: ['', [Validators.required, Validators.minLength(15)]],
      unit_implementation_date: ['', Validators.required],
      holder_email: ['', [Validators.required, Validators.email]],
      location: [''],
      street: [''],          
      neighborhood: [''],    
      number: [''],          
      zone: [''],           
      reference_point: [''],
      city: [''],            
      state: [''],           
      zip_code: [''] ,
    });

    this.form.get('document_number')?.disable();

    this.form.get('selected_account')?.valueChanges.subscribe(contaId => {
      this.selectedAccount = this.listAccounts.find(a => a.id === contaId) || null;

    });

    this.form.get('selected_document')?.valueChanges.subscribe((selectedId: any) => {
      const selectedOption = this.listDocuments.find(doc => doc.id === selectedId);
      this.updateDocumentFieldState(selectedOption);
    });

    this.form.get('switch_consumer_is_active')?.valueChanges.subscribe((isActive: boolean) => {
      this.form.get('selected_document')?.reset('');
      this.form.get('name_consumer_unit')?.reset('');
      console.log('Campo "Ativo" alterado:', isActive);

    });
  }

  private updateDocumentFieldState(selectedOption?: Dependency): void {
    if (!selectedOption) {
      this.documentPlaceholder = 'CPF/CNPJ';
      this.documentMask = '';
      this.form.get('document_number')?.reset('');
      this.form.get('document_number')?.disable();
      return;
    }
    this.form.get('document_number')?.enable();

    const name = selectedOption.name.toLowerCase();
    if (name === 'cpf') {
      this.documentPlaceholder = 'CPF';
      this.documentMask = 'cpf';
    } else if (name === 'cnpj') {
      this.documentPlaceholder = 'CNPJ';
      this.documentMask = 'cnpj';
    } else {
      this.documentPlaceholder = 'CPF/CNPJ';
      this.documentMask = '';
    }

    this.form.get('document_number')?.reset();
  }

  get isDocumentInputDisabled(): boolean {
    return !this.form.get('selected_document')?.value;
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
          () => { }
        );
      }
    });
  }

  private getTariffGroup(): void {
    this.isLoading = true;
    this.createAccountMock.getTariffGroups().subscribe({
      next: (listGroupTariff) => {
        this.listSubgroupTariff = listGroupTariff;
        this.isLoading = false;
      },
      error: (erro) => {
        this.isLoading = false;
        this.notificationService.showError(
          'Erro ao carregar a lista de classes',
          7000,
          'Recarregue a página e tente novamente',
          undefined,
          () => { }
        );
      }
    });
  }

  private getModalities(): void {
    this.isLoading = true;
    this.createAccountMock.getModalities().subscribe({
      next: (listModalities) => {
        this.listModalities = listModalities;
        this.isLoading = false;
      },
      error: (erro) => {
        this.isLoading = false;
        this.notificationService.showError(
          'Erro ao carregar a lista de modalidades',
          7000,
          'Recarregue a página e tente novamente',
          undefined,
          () => { }
        );
      }
    });
  }

  private getListClass(): void {
    this.isLoading = true;
    this.createAccountMock.getDependencies().subscribe({
      next: (listClass) => {
        this.listClass = listClass;
        this.isLoading = false;
      },
      error: (erro) => {
        this.isLoading = false;
        this.notificationService.showError(
          'Erro ao carregar a lista de classes',
          7000,
          'Recarregue a página e tente novamente',
          undefined,
          () => { }
        );
      }
    });
  }

  private getSelectedDocument(): void {
    this.isLoading = true;
    this.createAccountMock.getIdentityGroups().subscribe({
      next: (listDocuments) => {
        this.listDocuments = listDocuments;
        this.isLoading = false;
      },
      error: (erro) => {
        this.isLoading = false;
        this.notificationService.showError(
          'Erro ao carregar a lista de documentos',
          7000,
          'Recarregue a página e tente novamente',
          undefined,
          () => { }
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

  private documentValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;
  
      const docType = this.documentMask;
  
      if (docType === 'cpf' && value.length !== 14) {
        return { invalidCpf: true };
      }
      if (docType === 'cnpj' && value.length !== 18) {
        return { invalidCnpj: true };
      }
      return null;
    };
  }
}
