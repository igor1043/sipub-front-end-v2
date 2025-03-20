import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { EnvironmentService } from './EnvironmentService';

interface MarkerPosition {
  lat: number;
  lng: number;
  address?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

@Component({
  selector: 'app-map-picker',
  templateUrl: './map-picker.component.html',
  styleUrls: ['./map-picker.component.css'],
  imports: [GoogleMapsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MapPickerComponent),
      multi: true
    }
  ],
  standalone: true
})
export class MapPickerComponent implements ControlValueAccessor, OnInit {
  apiKey: string = "your_api_key";
  private currentMapCenter?: google.maps.LatLngLiteral;
  center: MarkerPosition = { lat: -23.5505, lng: -46.6333 };

  constructor(private envService: EnvironmentService) {}

  @Input() title: string = '';
  @Input() initialCenter: MarkerPosition = { lat: -23.5505, lng: -46.6333 };
  @Input() zoom: number = 18;
  @Input() markerIconUrl: string = '';

  marker?: { position: MarkerPosition };
  map?: google.maps.Map;
  userPosition?: MarkerPosition;
  address: string = '';

  get markerOptions() {
    return {
      draggable: true,
      icon: {
        url: this.markerIconUrl,
        scaledSize: new google.maps.Size(40, 40),
      },
    };
  }

  mapOptions: google.maps.MapOptions = {
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.TOP_RIGHT,
      mapTypeIds: ['roadmap', 'satellite']
    },
    streetViewControl: false,
    clickableIcons: false
  };

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {
    const config = this.envService.getConfig();
    this.apiKey = config ? config.googleMapsKey : 'default_key';
    this.getUserLocation();
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          // Atualiza o centro inicial e move o mapa se já estiver carregado
          this.initialCenter = this.userPosition;
          
          if (this.map) {
            this.map.panTo(this.userPosition);
            this.map.setZoom(this.zoom);
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Se falhar, mantém a posição inicial padrão
          if (this.map) {
            this.map.panTo(this.initialCenter);
          }
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  writeValue(value: MarkerPosition | null): void {
    if (value) {
      const isSamePosition = this.marker?.position.lat === value.lat && 
                            this.marker?.position.lng === value.lng;
      if (!isSamePosition) {
        this.marker = { position: value };
        this.animateMapTo(value);
      }
    } else {
      this.marker = undefined;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  onMapReady(map: google.maps.Map): void {
    this.map = map;
    this.setupMapListeners();
    this.trackMapCenter();

    // Se já temos a posição do usuário, move o mapa imediatamente
    if (this.userPosition) {
      this.map.panTo(this.userPosition);
    }
  }

  private trackMapCenter(): void {
    if (this.map) {
      this.map.addListener('center_changed', () => {
        const center = this.map?.getCenter();
        if (center) {
          this.currentMapCenter = {
            lat: center.lat(),
            lng: center.lng()
          };
        }
      });
    }
  }

  private setupMapListeners(): void {
    if (!this.map) return;

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        this.addMarker(event.latLng);
        this.getAddress(event.latLng);
      }
    });

    this.map.addListener('rightclick', () => {
      this.removeMarker();
    });
  }

  onMarkerDragEnd(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.updatePosition(newPosition);
      this.getAddress(event.latLng);
    }
  }

  private addMarker(latLng: google.maps.LatLng): void {
    this.marker = {
      position: {
        lat: latLng.lat(),
        lng: latLng.lng()
      }
    };
    this.updatePosition(this.marker.position);
  }

  private removeMarker(): void {
    this.marker = undefined;
    this.address = '';
    this.onChange(null);
    this.onTouched();
    
    // Mantém a posição atual do mapa
    if (this.map && this.currentMapCenter) {
      this.map.panTo(this.currentMapCenter);
    }
  }

  private updatePosition(position: MarkerPosition): void {
    this.onChange(position);
    this.onTouched();
  }

  private getAddress(latLng: google.maps.LatLng): void {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        const addressComponents = results[0].address_components;
        const addressDetails: Partial<MarkerPosition> = {
          address: results[0].formatted_address
        };

        addressComponents.forEach(component => {
          if (component.types.includes('street_number')) {
            addressDetails.street = component.long_name;
          }
          if (component.types.includes('route')) {
            addressDetails.street = `${addressDetails.street || ''} ${component.long_name}`.trim();
          }
          if (component.types.includes('sublocality')) {
            addressDetails.neighborhood = component.long_name;
          }
          if (component.types.includes('locality')) {
            addressDetails.city = component.long_name;
          }
          if (component.types.includes('administrative_area_level_1')) {
            addressDetails.state = component.short_name;
          }
          if (component.types.includes('postal_code')) {
            addressDetails.postalCode = component.long_name;
          }
          if (component.types.includes('country')) {
            addressDetails.country = component.long_name;
          }
        });

        if (this.marker) {
          this.marker.position = { 
            ...this.marker.position,
            ...addressDetails 
          };
          this.updatePosition(this.marker.position);
        }
      }
    });
  }

  private animateMapTo(position: MarkerPosition): void {
    if (this.map) {
      this.map.panTo(position);
    }
  }
}