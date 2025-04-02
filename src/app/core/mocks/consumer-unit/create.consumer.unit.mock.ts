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
      { id: 8, name: 'B1 - Residencial', type: 'tariff_group' },
      { id: 9, name: 'B2 - Industrial', type: 'tariff_group' },
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
      { id: 8, name: 'CPF', type: 'document' },
      { id: 9, name: 'CNPJ', type: 'document' },
    ];

    return of(tariffGroups).pipe(delay(800));
  }

  getModalities() {
    const modalities: Dependency[] = [
      { id: 17, name: 'Autoconsumo Remoto', type: 'modality' },
      { id: 18, name: 'Geração Compartilhada', type: 'modality' },
      { id: 19, name: 'Geração na Própria UC', type: 'modality' },
      { id: 20, name: 'Integração de Múltiplas UCs', type: 'modality' },
      { id: 21, name: 'Empreendimento com Múltiplas UCs', type: 'modality' },
      { id: 22, name: 'Geração Distribuída Isenta', type: 'modality' },
      { id: 23, name: 'Compensaçao de Energia', type: 'modality' }
    ];

    return of(modalities).pipe(delay(800));
  }

  // Mock para níveis de tensão
  getVoltageLevels() {
    const voltageLevels: Dependency[] = [
      { id: 24, name: 'Baixa Tensão', type: 'voltage_level' },
      { id: 25, name: 'Média Tensão', type: 'voltage_level' },
      { id: 26, name: 'Alta Tensão', type: 'voltage_level' }
    ];

    return of(voltageLevels).pipe(delay(800));
  }

  // Mock para tipos de conexão
  getConnectionTypes() {
    const connectionTypes: Dependency[] = [
      { id: 27, name: 'Monofásico', type: 'connection_type' },
      { id: 28, name: 'Bifásico', type: 'connection_type' },
      { id: 29, name: 'Trifásico', type: 'connection_type' }
    ];

    return of(connectionTypes).pipe(delay(800));
  }

  // Mock para tensões de atendimento
  getServiceVoltages() {
    const serviceVoltages: Dependency[] = [
      { id: 30, name: '110V', type: 'service_voltage' },
      { id: 31, name: '127V', type: 'service_voltage' },
      { id: 32, name: '220V', type: 'service_voltage' },
      { id: 33, name: '380V', type: 'service_voltage' },
      { id: 34, name: '440V', type: 'service_voltage' }
    ];

    return of(serviceVoltages).pipe(delay(800));
  }

  // Mock para tipos de padrão de entrada
  getEntryStandards() {
    const entryStandards: Dependency[] = [
      { id: 35, name: 'Padrão Aéreo', type: 'entry_standard' },
      { id: 36, name: 'Padrão Subterrâneo', type: 'entry_standard' },
      { id: 37, name: 'Padrão Poste Particular', type: 'entry_standard' }
    ];

    return of(entryStandards).pipe(delay(800));
  }

  getEntryTypes() {
    const entryTypes: Dependency[] = [
      { id: 42, name: 'Aéreo', type: 'entry_type' },
      { id: 43, name: 'Subterrâneo', type: 'entry_type' },
      { id: 44, name: 'Aéreo com Saída Subterrânea', type: 'entry_type' }
    ];

    return of(entryTypes).pipe(delay(800));
  }

  // Mock para isolação do ramal de entrada
  getEntryCableInsulations() {
    const entryCableInsulations: Dependency[] = [
      { id: 38, name: 'PVC - Cobre', type: 'entry_cable_insulation' },
      { id: 39, name: 'EPR - Alumínio', type: 'entry_cable_insulation' },
      { id: 40, name: 'XLPE - Cobre', type: 'entry_cable_insulation' },
      { id: 41, name: 'XLPE - Alumínio', type: 'entry_cable_insulation' }
    ];

    return of(entryCableInsulations).pipe(delay(800));
  }

  // mock para zonas
  getListZones() {
    const zones: Dependency[] = [
      { id: 45, name: 'Zona Urbana', type: 'zone' },
      { id: 46, name: 'Zona Rural', type: 'zone' },
    ];

    return of(zones).pipe(delay(800));
  }


  // Mock para tipos de transformador
  getListTransformerTypes() {
    const transformerTypes: Dependency[] = [
      { id: 47, name: 'Óleo Mineral', type: 'transformer_type' },
      { id: 48, name: 'Óleo Vegetal', type: 'transformer_type' },
      { id: 49, name: 'A Seco', type: 'transformer_type' },
      { id: 50, name: 'Resina Epóxi', type: 'transformer_type' }
    ];

    return of(transformerTypes).pipe(delay(800));
  }

  // Mock para tipos de propriedade
  getListTransformerTypesOwner() {
    const propertyTypes: Dependency[] = [
      { id: 51, name: 'Município', type: 'property_type' },
      { id: 52, name: 'Concessionária', type: 'property_type' },
      { id: 53, name: 'Particular', type: 'property_type' },
      { id: 54, name: 'Governo Estadual', type: 'property_type' },
      { id: 55, name: 'Governo Federal', type: 'property_type' }
    ];

    return of(propertyTypes).pipe(delay(800));
  }
}