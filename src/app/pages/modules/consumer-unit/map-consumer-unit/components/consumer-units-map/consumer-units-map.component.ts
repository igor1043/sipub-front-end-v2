import { Component, Input, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

export interface ConsumerUnit {
  id: string;
  name: string;
  lat: number;
  lng: number;
  icon: string;
}

@Component({
  selector: 'app-consumer-units-map',
  templateUrl: './consumer-units-map.component.html',
  styleUrls: ['./consumer-units-map.component.css'],
  standalone: true,
  imports: [GoogleMapsModule, CommonModule]
})
export class ConsumerUnitsMapComponent implements OnInit {
  @Input() consumerUnits: ConsumerUnit[] = [];

  scaledSize = new google.maps.Size(40, 40);

  zoom = 14;
  center = { lat: -23.5505, lng: -46.6333 }; // SP como default
  map?: google.maps.Map;
  selectedUnit?: ConsumerUnit;

  ngOnInit(): void {
    if (this.consumerUnits.length > 0) {
      this.center = {
        lat: this.consumerUnits[0].lat,
        lng: this.consumerUnits[0].lng
      };
    }
  }

  onMapReady(map: google.maps.Map) {
    this.map = map;
  }

  onMarkerClick(unit: ConsumerUnit) {
    this.selectedUnit = unit;
    if (this.map) {
      this.map.panTo({ lat: unit.lat, lng: unit.lng });
    }
  }

  getScaledSize(width: number, height: number): google.maps.Size {
    return new google.maps.Size(width, height);
  }
  
}
