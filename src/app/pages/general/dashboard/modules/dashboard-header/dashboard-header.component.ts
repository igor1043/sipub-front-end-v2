import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'app/core/interfaces/account.interface';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';
import { AccountService } from 'app/core/services/account/account.service';
import { AccountConfigurationResponse } from 'app/core/services/account/models/account.image.model';
import { firstValueFrom } from 'rxjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Module } from 'app/core/interfaces/module.interface';
@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  imports: [MatProgressSpinnerModule, CommonModule],
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

  constructor(
    private accountService: AccountService
  ) {}

  async ngOnInit(): Promise<void> {
    
    if (this.accountSelected) {
      this.accountName = this.accountSelected.alias;
      this.accountUrl = this.accountSelected.url_account;
      
      if (this.accountSelected.id) {
        await this.getImageAccount(this.accountSelected.id);
      }
    }
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
}