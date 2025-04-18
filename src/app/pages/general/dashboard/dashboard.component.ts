import {  Component, Injector, OnInit, Type } from '@angular/core';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';
import { Account } from 'app/core/interfaces/account.interface';
import { getModuleById,  Module, ModuleType } from 'app/core/interfaces/module.interface';
import { CommonModule } from '@angular/common';
import { DashboardPublicIlluminationComponent } from './modules/public-illumination/dashboard-public-illumination/dashboard-public-illumination.component';
import { DashboardHeaderComponent } from "./components/dashboard-header/dashboard-header.component";
import { DividerComponent } from "../../../desing-system/ui-components/divider/divider.component";
import { SvgIconComponent } from "../../../desing-system/ui-components/svg-icon/svg-icon.component";
import { DashboardConsumerUnitComponent } from './modules/consumer-unit/dashboard-consumer-unit/dashboard-consumer-unit.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    DividerComponent,
    SvgIconComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  currentAccount: Account | null = null;
  currentModule: Module | null = null;
  dashboardComponent: Type<any> | null = null;
  dashboardInjector: Injector | null = null;

  private moduleComponentMap: Record<number, Type<any>> = {
    [ModuleType.PublicIllumination.id]: DashboardPublicIlluminationComponent,
    [ModuleType.ConsumerUnit.id]: DashboardConsumerUnitComponent,
  };

  constructor(
    private localStorageService: LocalStorageService,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.currentAccount = this.localStorageService.getAccountSelected();
    this.currentModule = getModuleById(this.localStorageService.getCurrentModule()!);
    this.dashboardComponent = this.moduleComponentMap[this.currentModule?.id ?? -1] ?? null;

    if (this.currentAccount) {
      this.dashboardInjector = Injector.create({
        providers: [
          { provide: 'accountId', useValue: this.currentAccount.id }
        ],
        parent: this.injector
      });
    }
  }
}