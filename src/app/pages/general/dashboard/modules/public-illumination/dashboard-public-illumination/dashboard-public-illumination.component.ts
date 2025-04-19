import { Component, Inject, Input, OnInit } from '@angular/core';
import { AppDashboardLayoutComponent } from "../../../components/app-dashboard-layout/dashboard-layout.component";
import { ApexChartComponent } from "../../../../../../desing-system/ui-components/apex-chart/apex-chart.component";
import { LuminousPointCountComponent } from "../luminous-point-count/luminous-point-count.component";
import { PublicIlluminationCountComponent } from "../public-illumination-count/public-illumination-count.component";
import { EnergyConsumptionCardComponent } from "../energy-consumption-card/energy-consumption-card.component";
import { GaugeMeterComponent } from "../../../../../../desing-system/ui-components/gauge-meter/gauge-meter.component";
import { CircularGaugeComponent } from "../../../../../../desing-system/ui-components/circular-gauge/circular-gauge.component";

@Component({
  selector: 'app-dashboard-public-illumination',
  templateUrl: './dashboard-public-illumination.component.html',
  styleUrls: ['./dashboard-public-illumination.component.css'],
  imports: [AppDashboardLayoutComponent, ApexChartComponent, LuminousPointCountComponent, PublicIlluminationCountComponent, EnergyConsumptionCardComponent, GaugeMeterComponent, CircularGaugeComponent]
})
export class DashboardPublicIlluminationComponent implements OnInit {
  constructor(@Inject('accountId') public accountId: number) {}

  ngOnInit() {
  }
}