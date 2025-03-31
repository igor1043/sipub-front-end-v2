import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

export interface Dependency {
  id: number;
  name: string;
  type: string;
}

@Injectable({ providedIn: 'root' })
export class CreateConsumerUnitMockService {

  // Mock para classes de unidade consumidora
  getDependencies() {
    const mockDependencies: Dependency[] = [
      { id: 1, name: 'Industrial', type: 'class' },
      { id: 2, name: 'Residencial', type: 'class' },
      { id: 3, name: 'Comercial', type: 'class' },
      { id: 4, name: 'Rural', type: 'class' },
      { id: 5, name: 'Poder Público', type: 'class' },
      { id: 6, name: 'Serviços Públicos', type: 'class' },
      { id: 7, name: 'Iluminação Pública', type: 'class' }
    ];

    return of(mockDependencies).pipe(delay(800));
  }

  // Novo mock para grupos tarifários
  getTariffGroups() {
    const tariffGroups: Dependency[] = [
      { id: 8,  name: 'B1 - Residencial', type: 'tariff_group' },
      { id: 9,  name: 'B2 - Industrial', type: 'tariff_group' },
      { id: 10, name: 'B3 - Comercial', type: 'tariff_group' },
      { id: 11, name: 'A4 - Rural', type: 'tariff_group' },
      { id: 12, name: 'B3 - Poder Público - Municipal', type: 'tariff_group' },
      { id: 13, name: 'B3 - Serviço Público - Estadual', type: 'tariff_group' },
      { id: 14, name: 'A4 - Iluminação Pública - Federal', type: 'tariff_group' },
      { id: 15, name: 'B4 - Educação e Saúde', type: 'tariff_group' },
      { id: 16, name: 'AS - Serviço de Água', type: 'tariff_group' }
    ];

    return of(tariffGroups).pipe(delay(800));
  }

  getIdentityGroups() {
    const tariffGroups: Dependency[] = [
      { id: 8,  name: 'CPF', type: 'document' },
      { id: 9,  name: 'CNPJ', type: 'document' },
    ];

    return of(tariffGroups).pipe(delay(800));
  }
}