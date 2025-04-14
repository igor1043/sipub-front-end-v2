import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Account } from 'app/core/interfaces/account.interface';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';
import { AccountService } from 'app/core/services/account/account.service';
import { AccountConfigurationResponse } from 'app/core/services/account/models/account.image.model';
import { firstValueFrom } from 'rxjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { getAvailableModules, Module } from 'app/core/interfaces/module.interface';
import { ButtonComponent } from "../../../../../desing-system/ui-components/button/button.component";
import { LoadingComponent } from "../../../../../desing-system/ui-components/loading/loading.component";
import { DropdownComponent } from "../../../../../desing-system/ui-components/inputs/dropdown/dropdown.component";
import { ModuleDropdownComponent } from "../../../../../desing-system/ui-components/module-dropdown/module-dropdown.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsMockService } from 'app/core/mocks/accounts.mock';
@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  imports: [MatProgressSpinnerModule, CommonModule, ButtonComponent, LoadingComponent, DropdownComponent, ModuleDropdownComponent],
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  @Input() accountSelected: Account | null = null;
  @Input() moduleSelected: Module | null = null;;

  accountName: string = '';
  accountUrl: string = '';
  accountLogo: string | undefined;
  imageLoadError: boolean = false;
  loadingImage: boolean = false;

  form: FormGroup;
  listAccounts: Account[] = [];
  modules: Module[] = [];
  selectedModule: Module | null = null;
  isLoading: boolean = false;
  showDropdownSelector: boolean = false;


  constructor(
    private accountService: AccountService,
    private accountsMock: AccountsMockService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      selected_account: [null, Validators.required],
      selected_module: [null, Validators.required],
    });

    this.form.get('selected_account')?.valueChanges.subscribe(accountId => {
      this.accountSelected = this.listAccounts.find(a => a.id === accountId) || null;
      this.selectedModule = null;
      this.modules = [];

      if (accountId) {
        this.carregarModulos(accountId);
      }

      this.verificaFechamentoModal();
    });

    this.form.get('selected_module')?.valueChanges.subscribe(() => {
      console.log('Módulo selecionado:', this.form.get('selected_module')?.value);
      this.verificaFechamentoModal();
    });
  }

  private verificaFechamentoModal(): void {
    const accountValid = this.form.get('selected_account')?.valid;
    const moduleValid = this.form.get('selected_module')?.valid;

    if (accountValid && moduleValid) {
      this.fecharModal();
    }
  }


  async ngOnInit(): Promise<void> {
    if (this.accountSelected) {
      this.accountName = this.accountSelected.alias;
      this.accountUrl = this.accountSelected.url_account;

      if (this.accountSelected.id) {
        this.getImageAccount(this.accountSelected.id);
      }
    }

    this.form.valueChanges.subscribe(val => {
      if (val.selected_account && val.selected_module) {
        this.showDropdownSelector = false;
      }
    });
  }

  onChangeAccount(): void {
    this.showDropdownSelector = true;
    this.carregarContas();
  }

  private carregarContas(): void {
    this.isLoading = true;
    this.accountsMock.getAccounts().subscribe({
      next: (accounts) => {
        this.listAccounts = accounts;
        this.isLoading = false;

      },
      error: () => {
        this.isLoading = false;
        console.error('Erro ao carregar a lista de contas');
      }
    });
  }

  fecharModal(): void {
    this.showDropdownSelector = false;
    setTimeout(() => this.form.reset(), 0); 
  }

  private carregarModulos(accountId: number): void {
    this.isLoading = true;
    const availableIds = this.localStorageService.getAvailableModules();
    this.modules = getAvailableModules(availableIds);
    this.isLoading = false;
  }

  onModuleSelected(module: Module | null) {
    this.selectedModule = module;
    console.log('Módulo selecionado:ww', module);
  }

  get accountOptions(): { id: number, name: string }[] {
    return this.listAccounts.map(account => ({
      id: account.id,
      name: account.name
    }));
  }



  async getImageAccount(id_account: number): Promise<void> {
    this.loadingImage = true;
    try {
      const response: AccountConfigurationResponse = await firstValueFrom(
        this.accountService.getAccountImageConfiguration(id_account)
      );
      this.accountLogo = response.data.payload[0]?.signed_url;
      this.imageLoadError = false;
    } catch (error) {
      this.accountLogo = undefined;
      this.imageLoadError = true;
      console.error('Erro ao baixar imagem da conta:', error);
    } finally {
      this.loadingImage = false;
    }
  }

  hasLogo(): boolean {
    return !!this.accountLogo && !this.imageLoadError;
  }

  closePopup(): void {
    this.showDropdownSelector = false;
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    if (this.showDropdownSelector) {
      this.fecharModal();
    }
  }
}