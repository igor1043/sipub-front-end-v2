import { Component, HostListener, Input, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Account } from 'app/core/interfaces/account.interface';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';
import { AccountService } from 'app/core/services/account/account.service';
import { AccountConfigurationResponse } from 'app/core/services/account/models/account.image.model';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { getAvailableModules, Module } from 'app/core/interfaces/module.interface';
import { ButtonComponent } from "../../../../../desing-system/ui-components/button/button.component";
import { LoadingComponent } from "../../../../../desing-system/ui-components/loading/loading.component";
import { DropdownComponent } from "../../../../../desing-system/ui-components/inputs/dropdown/dropdown.component";
import { ModuleDropdownComponent } from "../../../../../desing-system/ui-components/module-dropdown/module-dropdown.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountResponse } from 'app/core/services/account/models/account.model';
import { NotificationService } from 'app/desing-system/ui-components/notification/NotificationService';
import { NotificationComponent } from "../../../../../desing-system/ui-components/notification/notification.component";
import { SvgIconComponent } from "../../../../../desing-system/ui-components/svg-icon/svg-icon.component";
import { TextComponent } from "../../../../../desing-system/ui-components/text/text.component";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    ButtonComponent,
    LoadingComponent,
    DropdownComponent,
    ModuleDropdownComponent,
    NotificationComponent,
    SvgIconComponent,
    TextComponent
],
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  @Input() accountSelected: Account | null = null;
  @Input() moduleSelected: Module | null = null;

  @Output() selectionSuccess = new EventEmitter<void>();

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
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private cdref: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) {
    this.form = this.fb.group({
      selected_account: [null, Validators.required],
      selected_module: [null, Validators.required],
    });

    this.form.get('selected_account')?.valueChanges.subscribe(accountId => {
      const account = this.listAccounts.find(a => a.id === accountId) || null;
      this.accountSelected = account;
      if (account) {
        this.loadModules(accountId);
      }
      this.selectedModule = null;
      this.form.get('selected_module')?.reset(null);
    });

    this.form.get('selected_module')?.valueChanges.subscribe(module => {
      this.verificaFechamentoModal();
    });
  }

  private async verificaFechamentoModal(): Promise<void> {
    const selectedAccountId = this.form.get('selected_account')?.value;
    const selectedModule = this.form.get('selected_module')?.value;

    if (selectedAccountId && selectedModule) {
      const account = this.listAccounts.find(a => a.id === selectedAccountId) || null;
      this.accountSelected = account;
      this.moduleSelected = selectedModule;

      if (this.accountSelected) {
        this.accountName = this.accountSelected.name;
        this.accountUrl = this.accountSelected.url_account;

        await this.getImageAccount(this.accountSelected.id);
        this.localStorageService.setAccountSelected(this.accountSelected);
      }

      if (this.moduleSelected) {
        this.localStorageService.setCurrentModule(this.moduleSelected.id);
      }

      this.closeModal();
      this.form.reset();
      this.cdref.detectChanges();

      this.selectionSuccess.emit();
    }
  }

  async ngOnInit(): Promise<void> {
    if (this.accountSelected) {
      this.accountName = this.accountSelected.alias;
      this.accountUrl = this.accountSelected.url_account;

      if (this.accountSelected.id) {
        await this.getImageAccount(this.accountSelected.id);
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
    this.loadListAccount();
  }

  async loadListAccount(): Promise<void> {
    this.isLoading = true;
    try {
      const response: AccountResponse = await firstValueFrom(
        this.accountService.getAccounts()
      );

      const successRange = { min: 200, max: 299 };
      console.log('Response:', response);
      if (response.meta.code < successRange.min || response.meta.code > successRange.max) {
        this.notificationService.showError('Erro', 'Erro ao carregar a lista de contas.');
        this.closeModal();
      }

      this.listAccounts = response.data;
    } catch (error) {
      console.error('Erro ao carregar a lista de contas', error);
    } finally {
      this.isLoading = false;
    }
  }

  closeModal(): void {
    this.showDropdownSelector = false;
  }

  private loadModules(accountId: number): void {
    this.isLoading = true;
    const availableIds = this.localStorageService.getAvailableModules();
    this.modules = getAvailableModules(availableIds);

    if (this.modules.length === 0) {
      this.notificationService.showError('Erro', 'Nenhum módulo disponível para esta conta.');
    }

    this.isLoading = false;
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
      this.closeModal();
    }
  }
}