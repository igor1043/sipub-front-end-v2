import { Component, Input, NgZone, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { VisibleUnitsSidebarComponent } from "../visible-units-sidebar/visible-units-sidebar.component";
import { getConsumerUnitsInArea } from './points.mock';
import { NotificationService } from 'app/desing-system/ui-components/notification/NotificationService';
import { NotificationComponent } from "../../../../../../desing-system/ui-components/notification/notification.component";


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
  imports: [GoogleMapsModule, CommonModule, MatIconModule, VisibleUnitsSidebarComponent,  NotificationComponent]
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

  readonly selectedIconUrl = 'assets/icons/ic_marker_consumer_unit_selected.svg';
  private selectedUnitId: string | null = null;

  mapOptions: google.maps.MapOptions = {
    streetViewControl: false,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
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

  constructor(private ngZone: NgZone, private notificationService: NotificationService) { }

  onMapReady(map: google.maps.Map) {
    this.map = map;
    this.createMarkers();

    map.addListener('idle', () => {
      this.ngZone.run(() => {
        this.handleMapIdle();
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
          url: unit.id === this.selectedUnitId ? this.selectedIconUrl : unit.icon,
          scaledSize: this.scaledSize
        },
        map: this.map
      });

      (marker as any).consumerUnitId = unit.id;

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

  getIconUrl(unit: ConsumerUnit): string {
    return this.selectedUnit?.id === unit.id ? this.selectedIconUrl : unit.icon;
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
    this.selectedUnitId = unit.id;

    if (this.map) {
      this.map.panTo({ lat: unit.lat, lng: unit.lng });
    }

    this.updateMarkerIcons();
  }

  private updateMarkerIcons() {
    this.markers.forEach(marker => {
      const markerUnitId = (marker as any).consumerUnitId;
      const correspondingUnit = this.consumerUnits.find(u => u.id === markerUnitId);

      if (correspondingUnit) {
        const isSelected = markerUnitId === this.selectedUnitId;
        marker.setIcon({
          url: isSelected ? this.selectedIconUrl : correspondingUnit.icon,
          scaledSize: this.scaledSize
        });
      }
    });
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
        
        if (this.selectedUnitId) {
          this.selectedUnit = undefined;
          this.selectedUnitId = null;
        }
        this.isLoading = false;

        if (this.map) {
          this.updateVisibleUnits();
        }
      })
      .catch(error => {
        this.isLoading = false;
        this.notificationService.showError('Acorreu um erro no carregamento dos marcadores do mapa, tente novamente');
      });
  }
}
