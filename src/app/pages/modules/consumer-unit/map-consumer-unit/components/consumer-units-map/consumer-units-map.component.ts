import { Component, Input, NgZone, OnInit } from '@angular/core';
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
  visibleUnits: ConsumerUnit[] = [];

  showSidebar = true;

  mapOptions: google.maps.MapOptions = {
    streetViewControl: false,
    styles: [
      {
        featureType: "poi",
        elementType: "all",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "transit",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "road.highway",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "road.arterial",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  };

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  ngOnInit(): void {
    if (this.consumerUnits.length > 0) {
      this.center = {
        lat: this.consumerUnits[0].lat,
        lng: this.consumerUnits[0].lng
      };
    }
  }

  constructor(private ngZone: NgZone) { }

  onMapReady(map: google.maps.Map) {
    this.map = map;

    map.addListener('bounds_changed', () => {
      this.ngZone.run(() => {
        this.updateVisibleUnits();
      });
    });

    map.addListener('idle', () => {
      this.ngZone.run(() => {
        this.updateVisibleUnits();
      });
    });

    this.updateVisibleUnits();

  }

  updateVisibleUnits() {
    if (!this.map) return;

    const bounds = this.map.getBounds();
    if (!bounds) return;

    this.visibleUnits = this.consumerUnits.filter(unit => {
      const position = new google.maps.LatLng(unit.lat, unit.lng);
      return bounds.contains(position);
    });
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
