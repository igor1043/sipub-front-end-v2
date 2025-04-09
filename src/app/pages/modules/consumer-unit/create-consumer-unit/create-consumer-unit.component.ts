import { Component, inject, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../../desing-system/ui-components/button/button.component';
import { SwitchItemComponent } from 'app/desing-system/ui-components/switch/switch-item.component';
import { TabsComponent } from 'app/desing-system/ui-components/tabs/tabs.component';
import { TextComponent } from 'app/desing-system/ui-components/text/text.component';
import { DividerComponent } from 'app/desing-system/ui-components/divider/divider.component';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from 'app/desing-system/ui-components/inputs/input-text/input-text.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from "../../../../desing-system/ui-components/inputs/dropdown/dropdown.component";
import { ImageUploadComponent } from 'app/desing-system/ui-components/image-upload/image-upload.component';
import { MapPickerComponent, MarkerPosition } from 'app/desing-system/ui-components/map-picker/map-picker.component';
import { AccountService } from 'app/core/services/account/account.service';
import { Account } from 'app/core/interfaces/account.interface';
import { AccountsMockService } from 'app/core/mocks/accounts.mock';
import { NotificationService } from 'app/desing-system/ui-components/notification/NotificationService';
import { LoadingComponent } from "../../../../desing-system/ui-components/loading/loading.component";
import { NotificationComponent } from "../../../../desing-system/ui-components/notification/notification.component";
import { CreateConsumerUnitMockService, Dependency } from 'app/core/mocks/consumer-unit/create.consumer.unit.mock';
import { ContainerInfoDateComponent } from "./components/container-info-date/container-info-date.component";
import { DialogConfig, DialogType, MessageDialogComponent } from "../../../../desing-system/ui-components/message-dialog/message-dialog.component";
import { InputDateComponent } from "../../../../desing-system/ui-components/inputs/input-date/input-date.component";
import { ActivatedRoute, Router } from '@angular/router';
import { LoadAndConsumptionComponent } from "./components/pages/load-and-consumption/load-and-consumption.component";
import { Equipment } from './components/pages/load-and-consumption/list-equipment-interface';
import { GenerationComponent } from "./components/pages/generation/generation.component";
import { GenerationData } from './components/pages/generation/GenerationData';


@Component({
  selector: 'app-create-consumer-unit',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SwitchItemComponent,
    TabsComponent,
    TextComponent,
    DividerComponent,
    InputTextComponent,
    DropdownComponent,
    ImageUploadComponent,
    MapPickerComponent,
    LoadingComponent,
    NotificationComponent,
    ContainerInfoDateComponent,
    MessageDialogComponent,
    InputDateComponent,
    LoadAndConsumptionComponent,
    GenerationComponent
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

  listClass: Dependency[] = [];
  selectedDocument: Dependency[] = [];
  tariffGroup: Dependency[] = [];
  modalities: Dependency[] = [];
  voltageLevels: Dependency[] = [];
  connectionTypes: Dependency[] = [];
  serviceVoltages: Dependency[] = [];
  entryStandards: Dependency[] = [];
  entryCableInsulations: Dependency[] = [];
  listDocuments: Dependency[] = [];
  listEntryTypes: Dependency[] = [];
  listZones: Dependency[] = [];
  listTypeTransformers: Dependency[] = [];
  listTypeTransformersOwner: Dependency[] = [];

  documentPlaceholder: string = 'CPF/CNPJ';
  documentMask: '' | 'cpf' | 'cnpj' = '';

  listSubgroupTariff: Dependency[] = []
  selectedSubgroupTariff: Dependency | null = null;

  listModalities: Dependency[] = []

  accounts: Account[] = [];

  myGenerationData: GenerationData = {
    generatorList: [], 
    generationSource: 1, 
    selectedFeatures: ['inversor', 'micro'] 
  };

  @ViewChild('messageDialog') messageDialog!: MessageDialogComponent;

  ngOnInit(): void {
    this.getListAccount();
    this.getListClass();
    this.getSelectedDocument();
    this.getTariffGroup();
    this.getModalities();
    this.getVoltageLevels();
    this.getConnectionTypes();
    this.getServiceVoltages();
    this.getEntryStandards();
    this.getEntryCableInsulations();
    this.getEntryTypes();
    this.getListZones();
    this.getListTransformerTypes();
    this.getListTransformerTypesOwner();

    this.route.params.subscribe(params => {
      const id = params['id'];
      // Use o ID para carregar os dados da unidade consumidora
    });
  }

  constructor(private fb: FormBuilder, private accountService: AccountService, private route: ActivatedRoute, private notificationService: NotificationService) {
    this.form = this.fb.group({
      // Controles de Informações basicas da unidade
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
      // Controles de Informações de Criação
      created_user: ['', Validators.required],
      holder_phone: ['', [Validators.required, Validators.minLength(15)]],
      unit_implementation_date: ['', Validators.required],
      holder_email: ['', [Validators.required, Validators.email]],
      // Controles de localização
      location: [''],
      street: [''],
      neighborhood: [''],
      number: [''],
      zone: [''],
      reference_point: [''],
      city: [''],
      state: [''],
      zip_code: [''],
      // Controles de Infraestrutura
      installed_load: ['', Validators.required],
      voltage_level: ['', Validators.required],
      connection_type: ['', Validators.required],
      service_voltage: ['', Validators.required],
      entry_standard: ['', Validators.required],
      power_factor: ['', Validators.required],
      entry_type: ['', Validators.required],
      entry_cable_insulation: ['', Validators.required],
      cable_gauge: ['', Validators.required],
      breaker_interrupt_current: ['', Validators.required],
      qgbt_distance: ['', Validators.required],
      switch_white_tariff: [false],
      // Controles de Transformador
      transformer: [''],
      transformer_power: [''],
      transformer_type: [''],
      transformer_owner: [''],
      // tab 3 - Carga e Cosumo
      equipments: this.fb.array([]) ,
      // tab 4 - Geração
      generationData: this.fb.group({
        generatorList: [[]],
        generationSource: [1, Validators.required],
        selectedFeatures: [['inversor', 'micro']]
      }) 
    });

    this.form.get('document_number')?.disable();


    this.setupListeners();
  }

  private setupListeners(): void {
    this.form.get('selected_account')?.valueChanges.subscribe(contaId => {


    });

    this.form.get('selected_document')?.valueChanges.subscribe((selectedId: any) => {
      const selectedOption = this.listDocuments.find(doc => doc.id === selectedId);
      this.updateDocumentFieldState(selectedOption);
    });

    this.form.get('switch_consumer_is_active')?.valueChanges.subscribe((isActive: boolean) => {
      this.form.get('selected_document')?.reset('');
      this.form.get('selected_account')?.reset('');
    });

    this.form.get('switch_cip_cosip')?.valueChanges.subscribe((isCipCosip: boolean) => {
      this.form.get('unit_implementation_date')?.reset('');
      console.log('CIP/COSIP:', isCipCosip);
    });

    this.setupLocationListener();
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
    console.log('Form values:', this.form.value);
    if (this.form.valid) {
      // Aqui você pode enviar os dados para o servidor
    } else {
      this.messageDialog.open({
        title: 'Existem campos vazios',
        subtitle: 'Preencha todos os campos obrigatórios',
        type: DialogType.WARNING,
        positiveButton: {
          label: 'Voltar',
          action: () => {
          }
        },
      });
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

  private getVoltageLevels(): void {
    this.isLoading = true;
    this.createAccountMock.getVoltageLevels().subscribe({
      next: (voltageLevels) => {
        this.voltageLevels = voltageLevels;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.showError(
          'Erro ao carregar os níveis de tensão',
          7000,
          'Recarregue a página e tente novamente'
        );
      }
    });
  }

  private getConnectionTypes(): void {
    this.isLoading = true;
    this.createAccountMock.getConnectionTypes().subscribe({
      next: (connectionTypes) => {
        this.connectionTypes = connectionTypes;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.showError(
          'Erro ao carregar os tipos de conexão',
          7000,
          'Recarregue a página e tente novamente'
        );
      }
    });
  }

  private getServiceVoltages(): void {
    this.isLoading = true;
    this.createAccountMock.getServiceVoltages().subscribe({
      next: (serviceVoltages) => {
        this.serviceVoltages = serviceVoltages;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.showError(
          'Erro ao carregar as tensões de atendimento',
          7000,
          'Recarregue a página e tente novamente'
        );
      }
    });
  }

  private getEntryStandards(): void {
    this.isLoading = true;
    this.createAccountMock.getEntryStandards().subscribe({
      next: (entryStandards) => {
        this.entryStandards = entryStandards;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.showError(
          'Erro ao carregar os padrões de entrada',
          7000,
          'Recarregue a página e tente novamente'
        );
      }
    });
  }

  private getEntryCableInsulations(): void {
    this.isLoading = true;
    this.createAccountMock.getEntryCableInsulations().subscribe({
      next: (entryCableInsulations) => {
        this.entryCableInsulations = entryCableInsulations;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.showError(
          'Erro ao carregar as isolação do ramal de entrada',
          7000,
          'Recarregue a página e tente novamente'
        );
      }
    });
  }

  private getEntryTypes(): void {
    this.isLoading = true;
    this.createAccountMock.getEntryTypes().subscribe({
      next: (entryTypes) => {
        this.listEntryTypes = entryTypes;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.showError(
          'Erro ao carregar as isolação do ramal de entrada',
          7000,
          'Recarregue a página e tente novamente'
        );
      }
    });
  }

  private getListZones(): void {
    this.isLoading = true;
    this.createAccountMock.getListZones().subscribe({
      next: (listZone) => {
        this.listZones = listZone;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.showError(
          'Erro ao carregar as zonas',
          7000,
          'Recarregue a página e tente novamente'
        );
      }
    });
  }

  private getListTransformerTypes(): void {
    this.isLoading = true;
    this.createAccountMock.getListTransformerTypes().subscribe({
      next: (listTransformers) => {
        this.listTypeTransformers = listTransformers;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.showError(
          'Erro ao carregar os tipos de transformadores',
          7000,
          'Recarregue a página e tente novamente'
        );
      }
    });
  }

  private getListTransformerTypesOwner(): void {
    this.isLoading = true;
    this.createAccountMock.getListTransformerTypesOwner().subscribe({
      next: (listTypesTransformers) => {
        this.listTypeTransformersOwner = listTypesTransformers;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.showError(
          'Erro ao carregar os tipos de transformadores',
          7000,
          'Recarregue a página e tente novamente'
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

  private setupLocationListener(): void {
    const locationControl = this.form.get('location');
    if (locationControl) {
      locationControl.valueChanges.subscribe((location: MarkerPosition) => {
        if (location) {
          this.form.patchValue({
            street: location.street,
            number: location.number,
            neighborhood: location.neighborhood,
            city: location.city,
            state: location.state,
            zip_code: location.postalCode,
            // zone e reference_point não são preenchidos automaticamente
          });
        }
      });
    }
  }

  onMarkerRemoved() {
    this.form.patchValue({
      street: null,
      number: null,
      neighborhood: null,
      city: null,
      state: null,
      zip_code: null,
    });
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
  onEquipmentListChanged(equipments: Equipment[]) {
    // Atualiza o FormArray com os novos equipamentos
    const equipmentsFormArray = this.form.get('equipments') as FormArray;
    
    // Limpa o array existente
    while (equipmentsFormArray.length !== 0) {
      equipmentsFormArray.removeAt(0);
    }
    
    // Adiciona os novos equipamentos
    equipments.forEach(equipment => {
      equipmentsFormArray.push(this.fb.group(equipment));
    });
    
    // Atualiza o valor do controle
    this.form.get('equipments')?.setValue(equipments);
  }

  
  onGenerationDataChanged(data: GenerationData) {
    this.myGenerationData = data;
  }
}

