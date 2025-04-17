import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SimpleTableComponent } from '../../../../desing-system/ui-components/tables/simple-table/simple-table.component';
import { TextComponent } from "../../../../desing-system/ui-components/text/text.component";
import { LoadingComponent } from 'app/desing-system/ui-components/loading/loading.component';
import { ConsumerUnit } from 'app/core/interfaces/modules/consumer-unit/list-consumer-unit.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsumerUnitsListMockService } from 'app/core/mocks/consumer-unit/consumer.unit.list.mock';
import { DropdownComponent } from "../../../../desing-system/ui-components/inputs/dropdown/dropdown.component";
import { NotificationService } from 'app/desing-system/ui-components/notification/NotificationService';
import { NotificationComponent } from "../../../../desing-system/ui-components/notification/notification.component";
import { Account } from 'app/core/interfaces/account.interface';
import { Router } from '@angular/router';
import { DialogType, MessageDialogComponent } from "../../../../desing-system/ui-components/message-dialog/message-dialog.component";
import { AccountResponse } from 'app/core/services/account/models/account.model';
import { firstValueFrom } from 'rxjs';
import { AccountService } from 'app/core/services/account/account.service';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';

@Component({
  selector: 'app-list-consumer-unit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent, SimpleTableComponent, TextComponent, LoadingComponent, DropdownComponent, NotificationComponent, MessageDialogComponent],
  templateUrl: './list-consumer-unit.component.html',
  styleUrl: './list-consumer-unit.component.css'
})
export class ListConsumerUnitComponent implements OnInit {
  //mocks
  private listAccountsMock = inject(ConsumerUnitsListMockService);

  form: FormGroup;

  listAccounts: Account[] = []

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
  ];
  selectedConsumerUnit: ConsumerUnit | null = null;

  @ViewChild('messageDialog') messageDialog!: MessageDialogComponent;

  ngOnInit(): void {
    this.loadListAccount();
  }

  constructor(private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      selected_account: ['', Validators.required],

    });
    this.setupListeners();
  }

  private setupListeners(): void {
    this.form.get('selected_account')?.valueChanges.subscribe(accountId => {

      console.log("a conta selecionada foi", accountId)
      this.allConsumerUnits = [];
      this.consumerUnitData = [];
      this.totalItems = 0;

      if (accountId) {
        this.carregarListaUnidadeConsumidora(accountId);
      }
    });
  }

  async loadListAccount(): Promise<void> {
    this.isLoading = true;
    try {
      const response: AccountResponse = await firstValueFrom(
        this.accountService.getAccounts()
      );

      this.listAccounts = response.data;

      const accountSelected = this.localStorageService.getAccountSelected();
      if (accountSelected && this.listAccounts.some(account => account.id === accountSelected.id)) {
        this.form.patchValue({
          selected_account: accountSelected
        });
      }
    } catch (error) {
      console.error('Erro ao carregar a lista de contas', error);
    } finally {
      this.isLoading = false;
    }
  }

  get accountOptions(): { id: number, name: string }[] {
    return this.listAccounts.map(account => ({
      id: account.id,
      name: account.name
    }));
  }

  private updateConsumerUnitData(): void {
    this.consumerUnitData = this.allConsumerUnits;

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

  handleAdd() {
    this.router.navigate(['/consumer-unit/add']);
  }

  handleEdit(consumerUnit: ConsumerUnit) {
    //this.router.navigate(['consumer-unit/edit', consumerUnit.id]);
  }

  handleDelete(consumerUnit: ConsumerUnit) {
    this.messageDialog.open({
      title: 'Confirmar Exclusão',
      subtitle: `Você está prestes a excluir a Unidade Consumidora (ID: ${consumerUnit.id}). Esta ação não pode ser desfeita.`,
      type: DialogType.WARNING,
      positiveButton: {
        label: 'Sim',
        action: () => {
          this.allConsumerUnits = this.allConsumerUnits.filter(item => item.id !== consumerUnit.id);
        }
      },
      negativeButton: {
        label: 'Não',
        action: () => {

        }
      },
    });
  }

  handleSelect(consumerUnit: ConsumerUnit) {

    this.selectedConsumerUnit = consumerUnit;
  }

  handlePageChange(event: { page: number, pageSize: number }) {
  }

  handleBulkDelete(items: ConsumerUnit[]): void {
    if (!items || items.length === 0) {
      this.notificationService.showWarning('Nenhum item selecionado para exclusão.');
      return;
    }

    const itemsCount = items.length;
    const itemsIds = items.map(item => item.id).join(', ');

    this.messageDialog.open({
      title: 'Confirmar Exclusão em Lote',
      subtitle: `Você está prestes a excluir ${itemsCount} unidade(s) consumidora(s):
                IDs: ${itemsIds} Esta ação não pode ser desfeita.`,
      type: DialogType.WARNING,
      positiveButton: {
        label: 'Sim',
        action: () => {

        }
      },
      negativeButton: {
        label: 'Não',
        action: () => {

        }
      },
    });
  }

}