import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownCheckboxComponent } from 'app/desing-system/ui-components/inputs/dropdown-checkbox/dropdown-checkbox.component';

@Component({
  selector: 'app-map-public-illumination',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownCheckboxComponent
  ],
  templateUrl: './map-public-illumination.component.html',
  styleUrl: './map-public-illumination.component.css'
})
export class MapPublicIlluminationComponent {
  lightingOptions = [
    { id: 1, name: 'Lâmpada LED 50W' },
    { id: 2, name: 'Lâmpada Vapor de Sódio 100W' },
    { id: 3, name: 'Luminária Decorativa' },
    { id: 4, name: 'Poste de Iluminação Pública' },
    { id: 5, name: 'Refletor de Área' }
  ];

  form: FormGroup;

  selectedLightings: number[] = []; 

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      lighting_types: ['', Validators.required]
    });

    this.form.get('lightingTypes')?.valueChanges.subscribe(selectedIds => {
      console.log('Tipos selecionados (Reactive):', selectedIds);
    });
  }

  clearSelections() {
    this.form.get('lightingTypes')?.setValue([]);
    
    this.selectedLightings = [];
  }

  onSelectionChange(selectedIds: number[]) {
    console.log('Tipos selecionados (Template):', selectedIds);
  }
}