import { Component, OnInit } from '@angular/core';
import { ConsumerUnit, ConsumerUnitsMapComponent } from "./components/consumer-units-map/consumer-units-map.component";

@Component({
  selector: 'app-map-consumer-unit',
  templateUrl: './map-consumer-unit.component.html',
  styleUrls: ['./map-consumer-unit.component.css'],
  imports: [ConsumerUnitsMapComponent]
})
export class MapConsumerUnitComponent implements OnInit {

  consumerUnits: ConsumerUnit[] = [
    { id: '1', name: 'Unidade A', lat: -23.5505, lng: -46.6333, icon: 'assets/icons/ic_marker_consumer_unit.svg' },
    { id: '2', name: 'Unidade B', lat: -23.5587, lng: -46.6250, icon: 'assets/icons/ic_marker_consumer_unit.svg' },
    { id: '3', name: 'Unidade C', lat: -23.5439, lng: -46.6357, icon: 'assets/icons/ic_marker_consumer_unit.svg' },
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
