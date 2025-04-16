import { Component, Input, NgZone, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { VisibleUnitsSidebarComponent } from "../visible-units-sidebar/visible-units-sidebar.component";
import { getConsumerUnitsInArea } from './points.mock';


export interface ConsumerUnit {
  id: string;
  name: string;
  neiborhod: string;
  street: string;
  number: string;
  lat: number;
  lng: number;
  icon: string;
  status: 'ativa' | 'inativa';
}


@Component({
  selector: 'app-consumer-units-map',
  templateUrl: './consumer-units-map.component.html',
  styleUrls: ['./consumer-units-map.component.css'],
  standalone: true,
  imports: [GoogleMapsModule, CommonModule, MatIconModule, VisibleUnitsSidebarComponent]
})
export class ConsumerUnitsMapComponent implements OnInit {
  @Input() consumerUnits: ConsumerUnit[] = [];

  scaledSize = new google.maps.Size(40, 40);
  markerCluster?: MarkerClusterer;
  markers: google.maps.Marker[] = [];

  zoom = 14;
  center = { lat: -23.5505, lng: -46.6333 };
  map?: google.maps.Map;
  selectedUnit?: ConsumerUnit;
  visibleUnits: ConsumerUnit[] = [];

  showSidebar = true;
  isLoading = true;

  selectedIcon = {
    url: 'assets/icons/ic_logout.svg',
    scaledSize: this.scaledSize
  };

  selectedMarker?: google.maps.Marker;
  
  mapOptions: google.maps.MapOptions = {
    streetViewControl: false,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT
    },
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
    this.createMarkers();

    map.addListener('idle', () => {
      this.ngZone.run(() => {
        this.handleMapIdle();
        console.log('Map is idle');
      });
    });

    this.handleMapIdle();
  }

  createMarkers() {
    if (!this.map) return;

    if (this.markerCluster) {
      this.markerCluster.clearMarkers();
    }

    this.markers = this.consumerUnits.map(unit => {
      const marker = new google.maps.Marker({
        position: { lat: unit.lat, lng: unit.lng },
        icon: {
          url: unit.icon,
          scaledSize: this.scaledSize
        },
        map: this.map
      });

      marker.addListener('click', () => {
        this.ngZone.run(() => this.onMarkerClick(unit));
      });

      return marker;
    });

    this.markerCluster = new MarkerClusterer({
      map: this.map,
      markers: this.markers
    });
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
  
    // Reset ícone do marcador anterior, se houver
    if (this.selectedMarker) {
      const previousUnit = this.consumerUnits.find(u =>
        u.lat === this.selectedMarker?.getPosition()?.lat() &&
        u.lng === this.selectedMarker?.getPosition()?.lng()
      );
      if (previousUnit) {
        this.selectedMarker.setIcon(this.defaultIcon(previousUnit));
      }
    }
  
    // Achar novo marcador
    const marker = this.markers.find(m =>
      m.getPosition()?.lat() === unit.lat &&
      m.getPosition()?.lng() === unit.lng
    );
  
    if (marker) {
      marker.setIcon(this.selectedIcon);
      this.selectedMarker = marker;
    }
  
    if (this.map) {
      this.map.panTo({ lat: unit.lat, lng: unit.lng });
    }
  }
  
  getScaledSize(width: number, height: number): google.maps.Size {
    return new google.maps.Size(width, height);
  }

  private handleMapIdle() {
    if (!this.map) return;

    const bounds = this.map.getBounds();
    if (!bounds) return;

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const boundingBox = {
      minLat: sw.lat(),
      maxLat: ne.lat(),
      minLng: sw.lng(),
      maxLng: ne.lng()
    };

    this.loadUnitsInArea(boundingBox);

    if (this.showSidebar) {
      this.updateVisibleUnits();
    }
  }

  loadUnitsInArea(boundingBox: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  }): void {
    this.isLoading = true;

    getConsumerUnitsInArea(boundingBox)
      .then(units => {
        this.consumerUnits = units;
        this.createMarkers();
        this.isLoading = false;

        if (this.map) {
          this.updateVisibleUnits();
        }
      })
      .catch(error => {
        this.isLoading = false;
        console.error('Error loading units:', error);
      });
  }
}
