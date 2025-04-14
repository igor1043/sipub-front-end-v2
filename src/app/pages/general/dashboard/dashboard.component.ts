import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';
import { SvgIconComponent } from "../../../desing-system/ui-components/svg-icon/svg-icon.component";
import { DashboardHeaderComponent } from "./components/dashboard-header/dashboard-header.component";
import { Account } from 'app/core/interfaces/account.interface';
import { getModuleById, Module } from 'app/core/interfaces/module.interface';
import { DividerComponent } from "../../../desing-system/ui-components/divider/divider.component";
import { AppDashboardLayoutComponent } from "./components/app-dashboard-layout/dashboard-layout.component";
import { ApexChartComponent } from "./components/apex-chart/apex-chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SvgIconComponent, DashboardHeaderComponent, DividerComponent, AppDashboardLayoutComponent, ApexChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  currentAccount: Account | null = null;
  currentModule: Module | null = null;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.currentAccount = this.localStorageService.getAccountSelected();
    this.currentModule = getModuleById(this.localStorageService.getCurrentModule()!);
  }
}