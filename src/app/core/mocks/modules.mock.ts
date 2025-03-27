// src/app/core/mocks/system.mock.ts
import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { Module } from '../interfaces/module.interface';

@Injectable({ providedIn: 'root' })
export class ModulesMockService {
  private mockModules: Module[] = [
    { 
      id: 1, 
      name: 'Iluminação Pública', 
      iconUrl: '/assets/ic_modules/ic_public_illumination.svg' 
    },
    { 
      id: 2, 
      name: 'Unidade Consumidora', 
      iconUrl: '/assets/ic_modules/ic_consumer_unit.svg' 
    },
    { 
      id: 3, 
      name: 'Abastecimento de Água', 
      iconUrl: '/assets/ic_modules/ic_water_supply.svg' 
    }
  ];

  getModules() {
    return of(this.mockModules).pipe(delay(300));
  }

}