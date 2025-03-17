import { Component } from '@angular/core';
import { SimpleTableComponent } from '../../../../desing-system/ui-components/tables/simple-table/simple-table.component';
import { PageEvent } from '@angular/material/paginator';

interface ConsumerUnit {
  id: number;
  name: string;
  class: string;
  cnpjCpf: string;
  address: string;
  status: string;
}

@Component({
  selector: 'app-list-consumer-unit',
  standalone: true,
  imports: [SimpleTableComponent],
  templateUrl: './list-consumer-unit.component.html',
  styleUrl: './list-consumer-unit.component.css'
})


export class ListConsumerUnitComponent {
  consumerUnitData: ConsumerUnit[] = [
    { id: 1, name: 'Unidade 1', class: 'Comercial', cnpjCpf: '123.456.789-00', address: 'Rua Don João VI, 123 efgeriljjipwerfn gpornwg nrn goẃrfno ǵnbníog j', status: 'Ativo' },
    { id: 2, name: 'Unidade 2', class: 'Residencial', cnpjCpf: '987.654.321-00', address: 'Rua B, 456', status: 'Inativo' },
    { id: 3, name: 'Unidade 3', class: 'Industrial', cnpjCpf: '456.789.123-00', address: 'Rua C, 789', status: 'Ativo' },
    { id: 4, name: 'Unidade 4', class: 'Rural', cnpjCpf: '321.654.987-00', address: 'Rua D, 101', status: 'Ativo' },
    { id: 5, name: 'Unidade 5', class: 'Comercial', cnpjCpf: '654.321.987-00', address: 'Rua E, 202', status: 'Inativo' },
    // Adicione mais unidades consumidoras conforme necessário
  ];

  tableColumns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nome da Unidade' },
    { key: 'class', header: 'Classe' },
    { key: 'cnpjCpf', header: 'CNPJ/CPF' },
    { key: 'address', header: 'Endereço' },
    { key: 'status', header: 'Status' }
  ];

  selectedConsumerUnit: ConsumerUnit | null = null;

  handleAdd() {
    console.log('Adicionar nova unidade consumidora');
  }

  handleEdit(consumerUnit: ConsumerUnit) {
    console.log('Editar unidade consumidora:', consumerUnit);
  }

  handleDelete(consumerUnit: ConsumerUnit) {
    console.log('Excluir unidade consumidora:', consumerUnit);
  }

  handleSelect(consumerUnit: ConsumerUnit) {
    console.log('Unidade consumidora selecionada:', consumerUnit);
    this.selectedConsumerUnit = consumerUnit;
  }

  handlePageChange(event: PageEvent) {
    console.log('Mudança de página:', event);
  }
}
