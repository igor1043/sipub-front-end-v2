// energy-consumption-card.component.ts
import { Component, Input } from '@angular/core';

interface EnergyData {
  dealership: {
    total_cost: string;
    total_consumption_kwh: string;
  };
  city: {
    total_cost: string;
    total_consumption_kwh: string;
  };
}

@Component({
  selector: 'app-energy-consumption-card',
  templateUrl: './energy-consumption-card.component.html',
  styleUrls: ['./energy-consumption-card.component.css']
})
export class EnergyConsumptionCardComponent {
  @Input() data: { data: EnergyData } = {
    data: {
      dealership: {
        total_cost: "R$263.598,94",
        total_consumption_kwh: "602.428,00 kWh"
      },
      city: {
        total_cost: "R$245.726,58",
        total_consumption_kwh: "561.582,00 kWh"
      }
    }
  };
}