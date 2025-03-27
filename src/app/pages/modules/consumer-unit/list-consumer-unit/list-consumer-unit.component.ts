import { Component, inject, OnInit } from '@angular/core';
import { SimpleTableComponent } from '../../../../desing-system/ui-components/tables/simple-table/simple-table.component';
import { TextComponent } from "../../../../desing-system/ui-components/text/text.component";
import { LoadingComponent } from 'app/desing-system/ui-components/loading/loading.component';
import { ConsumerUnit } from 'app/core/interfaces/modules/consumer-unit/list-consumer-unit.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account, AccountsMockService } from 'app/core/mocks/accounts.mock';
import { ConsumerUnitsListMockService } from 'app/core/mocks/consumer-unit/consumer.unit.list.mock';
import { DropdownComponent } from "../../../../desing-system/ui-components/inputs/dropdown/dropdown.component";
import { NotificationService } from 'app/desing-system/ui-components/notification/NotificationService';
import { NotificationComponent } from "../../../../desing-system/ui-components/notification/notification.component";


@Component({
  selector: 'app-list-consumer-unit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent, SimpleTableComponent, TextComponent, LoadingComponent, DropdownComponent, NotificationComponent],
  templateUrl: './list-consumer-unit.component.html',
  styleUrl: './list-consumer-unit.component.css'
})
export class ListConsumerUnitComponent implements OnInit {
  //mocks
  private listAccountsMock = inject(ConsumerUnitsListMockService);
  private accountsMock = inject(AccountsMockService);

  form: FormGroup;

  listAccounts: Account[] = []
  selectedAccount: Account | null = null;

  isLoading = false;
  error: string | null = null;

  // Dados
  allConsumerUnits: ConsumerUnit[] = [];
  consumerUnitData: ConsumerUnit[] = [];

  // Configurações
  totalItems = this.allConsumerUnits.length;
  pageSize = 5;
  currentPage = 0;
  tableColumns = [{ key: 'id', header: 'ID' },
  { key: 'name', header: 'Nome da Unidade' },
  { key: 'class', header: 'Classe' },
  { key: 'cnpjCpf', header: 'CNPJ/CPF' },
  { key: 'address', header: 'Endereço' },
  {
    key: 'status',
    header: 'Status',
    cellClass: (element: ConsumerUnit) => {
      return element.status === 'Ativo'
        ? 'status-badge status-ativo'
        : element.status === 'Em andamento'
          ? 'status-badge status-andamento'
          : 'status-badge status-inativo';
    }
  },
  {
    key: 'photo',
    header: 'Foto',
    imageOptions: {
      srcKey: 'imageUrl',   
      altKey: 'name',       
      width: '40px',         
      height: '40px'
    }
  }
  ];
  selectedConsumerUnit: ConsumerUnit | null = null;

  ngOnInit(): void {
    this.carregarContas();
    this.notificationService.showSuccess(
      'Sucesso!',
      5000,
      'Esta é a primeira notificação.',
      undefined,
      () => {
        console.log('Primeira notificação encerrada.');
      }
    );
    this.notificationService.showError(
      'Erro!',
      7000,
      'Esta é a segunda notificação.',
      undefined,
      () => {
        console.log('Segunda notificação encerrada.');
      }
    );
 
  }

  constructor(private fb: FormBuilder, private notificationService: NotificationService) {
    this.form = this.fb.group({
      selected_account: [null, Validators.required],
    });

    this.form.get('selected_account')?.valueChanges.subscribe(contaId => {
      this.selectedAccount = this.listAccounts.find(a => a.id === contaId) || null;
      this.allConsumerUnits = [];
      this.consumerUnitData = [];

      if (contaId) {
        this.carregarListaUnidadeConsumidora(contaId);
      }
    });
  }


  private carregarContas(): void {
    this.isLoading = true;
    this.accountsMock.getAccounts().subscribe({
      next: (contas) => {
        this.listAccounts = contas;
        this.isLoading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar contas:', erro);
        this.isLoading = false;
      }
    });
  }

  private updateConsumerUnitData(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.consumerUnitData = this.allConsumerUnits.slice(start, end);
    this.totalItems = this.allConsumerUnits.length;
  }
  
  private carregarListaUnidadeConsumidora(accountId: number): void {
    this.isLoading = true;
    this.listAccountsMock.getConsumerUnitsByAccount(accountId).subscribe({
      next: (listConsumerUnit) => {
        this.allConsumerUnits = listConsumerUnit;
        this.updateConsumerUnitData();
        this.isLoading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar contas:', erro);
        this.isLoading = false;
      }
    });
  }

  private updatePageData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.consumerUnitData = this.allConsumerUnits.slice(startIndex, endIndex);
  }

  handleAdd() {
    console.log('Adicionar nova unidade consumidora');
  }

  handleEdit(consumerUnit: ConsumerUnit) {
    console.log('Editar unidade consumidora:', consumerUnit);
  }

  handleDelete(consumerUnit: ConsumerUnit) {
    console.log('Excluir unidade consumidora:', consumerUnit);

    this.allConsumerUnits = this.allConsumerUnits.filter(item => item.id !== consumerUnit.id);
    this.totalItems = this.allConsumerUnits.length;
    this.updatePageData();
  }

  handleSelect(consumerUnit: ConsumerUnit) {
    console.log('Unidade consumidora selecionada:', consumerUnit);
    this.selectedConsumerUnit = consumerUnit;
  }

  handlePageChange(event: { page: number, pageSize: number }) {
    console.log('Mudança de página:', event);
    this.currentPage = event.page;
    this.pageSize = event.pageSize;
    this.updatePageData();
  }

  handleBulkDelete(items: ConsumerUnit[]): void {
    console.log('Itens selecionados para exclusão:', items);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulário válido', this.form.value);
    } else {
      console.log('Formulário inválido');
    }
  }

  get accountOptions(): { id: number, name: string }[] {
    return this.listAccounts.map(account => ({
      id: account.id,
      name: account.name 
    }));
  }
}