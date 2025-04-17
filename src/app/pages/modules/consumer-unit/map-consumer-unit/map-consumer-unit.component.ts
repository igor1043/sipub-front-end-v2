import { Component, OnInit } from '@angular/core';
import { ConsumerUnit, ConsumerUnitsMapComponent } from "./components/consumer-units-map/consumer-units-map.component";
import { TextComponent } from "../../../../desing-system/ui-components/text/text.component";
import { ConsumerUnitDetailComponent } from "./components/consumer-unit-detail/consumer-unit-detail.component";
import { CommonModule } from '@angular/common';

export interface SelectedConsumerUnit {
  unitId: string | null;
  accountId: number | null;
}

@Component({
  selector: 'app-map-consumer-unit',
  templateUrl: './map-consumer-unit.component.html',
  styleUrls: ['./map-consumer-unit.component.css'],
  imports: [CommonModule,ConsumerUnitsMapComponent, TextComponent, ConsumerUnitDetailComponent]
})
export class MapConsumerUnitComponent implements OnInit {
  currentConsumerUnit: SelectedConsumerUnit = { unitId: null, accountId: null };

  constructor() { }

  ngOnInit() {
  }

  onSelectedUnitChange(selectedUnit: SelectedConsumerUnit) {
    this.currentConsumerUnit = selectedUnit;
    console.log("disparei", selectedUnit)
  }
}