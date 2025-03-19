import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

interface MarkerPosition {
  lat: number;
  lng: number;
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
export class MapPickerComponent implements ControlValueAccessor {
  @Input() apiKey!: string;
  @Input() initialCenter: MarkerPosition = { lat: -23.5505, lng: -46.6333 };
  @Input() zoom: number = 12;

  marker?: { position: MarkerPosition };
  map?: google.maps.Map;
  markerOptions: google.maps.MarkerOptions = {
    draggable: true,
    icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
  };

  onChange: any = () => {};
  onTouched: any = () => {};

  get center(): google.maps.LatLngLiteral {
    return this.marker?.position || this.initialCenter;
  }

  writeValue(value: MarkerPosition | null): void {
    if (value) {
      this.marker = { position: value };
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
  }

  private setupMapListeners(): void {
    if (!this.map) return;

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        this.addMarker(event.latLng);
      }
    });

    this.map.addListener('rightclick', () => {
      this.removeMarker();
    });
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
    this.onChange(null);
    this.onTouched();
  }

  private updatePosition(position: MarkerPosition): void {
    this.onChange(position);
    this.onTouched();
  }
}
