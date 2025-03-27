// src/app/core/mocks/report.mock.ts
import { Injectable } from '@angular/core';
import { ReportGroup } from 'app/pages/general/manager/components/report-list/report.interface';
import { delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportMockService {
  getReportsByModule(moduleId: number) {
    const mockData: { [key: number]: ReportGroup[] } = {
      1: [
        {
          title: 'Ocorrências',
          subItems: [
            {
              id: 1,
              name: 'Resumido',
              formConfig: [
                { type: 'date', label: 'Data Inicial', key: 'startDate', required: true },
                { type: 'date', label: 'Data Final', key: 'endDate', required: true },
                { type: 'select', label: 'Tipo de Poste', key: 'postType', options: ['Metal', 'Concreto', 'Madeira'], required: true }
              ]
            },
          {
            id: 2,
            name: 'Atividade do Usuário',
            formConfig: []
          },
          {
            id: 3,
            name: 'Situação Motivo',
            formConfig: []
          },
          {
            id: 4,
            name: 'Geral',
            formConfig: []
          },
          {
            id: 5,
            name: 'Material Gasto',
            formConfig: []
          },
          ]
        },
        {
            title: 'Ponto Luminoso',
            subItems: [{
              id: 6,
              name: 'Atualização do Parque',
              formConfig: [ ]
            },
            {
              id: 7,
              name: 'Comparativo',
              formConfig: [ ]
            },
            {
              id: 8,
              name: 'Consumo Energético',
              formConfig: [ ]
            },
            {
              id: 9,
              name: 'Medidor',
              formConfig: [ ]
            },
            {
              id: 10,
              name: 'Patrimonial',
              formConfig: [ ]
            },
            {
              id: 11,
              name: 'Potências de Lâmpadas',
              formConfig: [ ]
            },
            {
              id: 12,
              name: 'Transformador',
              formConfig: [ ]
            },
            {
              id: 13,
              name: 'Usuário',
              formConfig: [ ]
            },
            ]
          }
      ],
      2: [
        {
          title: 'Relatórios de Unidade',
          subItems: [
            {
              id: 2,
              name: 'Conta de Energia',
              formConfig: [
                { type: 'month', label: 'Mês de Referência', key: 'referenceMonth', required: true },
                { type: 'number', label: 'Consumo Mínimo (kWh)', key: 'minConsumption' }
              ]
            }
          ]
        }
      ]
    };

    return of(mockData[moduleId] || []).pipe(delay(1000)); // Simula delay de API
  }
}