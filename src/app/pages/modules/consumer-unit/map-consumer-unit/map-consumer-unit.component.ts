import { Component, OnInit } from '@angular/core';
import { ConsumerUnit, ConsumerUnitsMapComponent } from "./components/consumer-units-map/consumer-units-map.component";
import { TextComponent } from "../../../../desing-system/ui-components/text/text.component";
import { ConsumerUnitDetailComponent } from "./components/consumer-unit-detail/consumer-unit-detail.component";

@Component({
  selector: 'app-map-consumer-unit',
  templateUrl: './map-consumer-unit.component.html',
  styleUrls: ['./map-consumer-unit.component.css'],
  imports: [ConsumerUnitsMapComponent, TextComponent, ConsumerUnitDetailComponent]
})
export class MapConsumerUnitComponent implements OnInit {

 

  constructor() { }

  ngOnInit() {
  }

}
