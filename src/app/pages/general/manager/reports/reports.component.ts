import { Component, inject, OnInit } from '@angular/core';
import { TextComponent } from "../../../../desing-system/ui-components/text/text.component";
import { ModuleDropdownComponent } from "../../../../desing-system/ui-components/module-dropdown/module-dropdown.component";
import { DropdownComponent } from "../../../../desing-system/ui-components/inputs/dropdown/dropdown.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportListComponent } from '../components/report-list/report-list.component';
import { DynamicFormComponent } from '../components/dynamic-form.html/dynamic-form.component';
import { ReportGroup, ReportSubItem } from '../components/report-list/report.interface';
import { ReportMockService } from 'app/core/mocks/report.mock';
import { getAvailableModules, Module, modules } from 'app/core/interfaces/module.interface';
import { AccountsMockService } from 'app/core/mocks/accounts.mock';
import { LoadingComponent } from "../../../../desing-system/ui-components/loading/loading.component";
import { Account } from 'app/core/interfaces/account.interface';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextComponent,
    ModuleDropdownComponent,
    DropdownComponent,
    ReportListComponent,
    DynamicFormComponent,
    LoadingComponent
  ]
})
export class ReportsComponent implements OnInit {
  //mocks
  private reportMock = inject(ReportMockService);
  private accountsMock = inject(AccountsMockService);

  form: FormGroup;
  reportGroups: ReportGroup[] = [];
  selectedSubItem: ReportSubItem | null = null;

  modules: Module[] = []
  listAccounts: Account[] = []

  selectedModule: Module | null = null;
  selectedAccount: Account | null = null;

  isLoading = false;

  availableModuleIds: number[] = [];

  ngOnInit(): void {
    this.carregarContas();
    this.availableModuleIds = this.localStorageService.getAvailableModules();
  }

  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService) {
    this.form = this.fb.group({
      selected_account: [null, Validators.required],
      selected_module: [null, Validators.required],
    });

    this.form.get('selected_account')?.valueChanges.subscribe(contaId => {
      this.selectedAccount = this.listAccounts.find(a => a.id === contaId) || null;
      this.selectedModule = null;
      this.modules = [];
      this.reportGroups = [];
      this.selectedSubItem = null;

      if (contaId) {
        this.carregarModulos(contaId);
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

  private carregarModulos(contaId: number): void {
    this.isLoading = true;
    const availableIds = this.localStorageService.getAvailableModules();
    this.modules = getAvailableModules(availableIds);
    this.isLoading = false;

  }

  onModuleSelected(module: Module | null) {
    this.selectedModule = module;
    this.selectedSubItem = null;
    this.reportGroups = [];

    if (module) {
      this.isLoading = true;
      this.reportMock.getReportsByModule(module.id).subscribe({
        next: (reports) => {
          this.reportGroups = reports;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar relatórios:', error);
          this.isLoading = false;
        }
      });
    }
  }

  onSubItemSelected(subItem: ReportSubItem) {
    this.selectedSubItem = subItem;
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
      name: account.name // Ou account.alias se preferir
    }));
  }
}