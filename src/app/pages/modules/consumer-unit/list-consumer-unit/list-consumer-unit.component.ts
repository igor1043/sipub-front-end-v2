import { Component } from '@angular/core';
import { SimpleTableComponent } from '../../../../desing-system/ui-components/tables/simple-table/simple-table.component';
import { TextComponent } from "../../../../desing-system/ui-components/text/text.component";
import { LoadingComponent } from 'app/desing-system/ui-components/loading/loading.component';

interface ConsumerUnit {
  id: number;
  name: string;
  class: string;
  cnpjCpf: string;
  address: string;
  status: string;
  imageUrl: string; 
}

@Component({
  selector: 'app-list-consumer-unit',
  standalone: true,
  imports: [SimpleTableComponent, TextComponent, LoadingComponent],
  templateUrl: './list-consumer-unit.component.html',
  styleUrl: './list-consumer-unit.component.css'
})
export class ListConsumerUnitComponent {
  isLoading = false;
  error: string | null = null;

    // Dados
    allConsumerUnits: ConsumerUnit[] = [    { id: 1, name: 'Unidade 1', class: 'Comercial', cnpjCpf: '123.456.789-00', address: 'Rua Don João VI, 123 efgeriljjipwerfn gpornwg nrn goẃrfno ǵnbníog j', status: 'Ativo',   imageUrl: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic_2788792_0.jpg' },
      { id: 2, name: 'Unidade 2', class: 'Residencial', cnpjCpf: '987.654.321-00', address: 'Rua B, 456', status: 'Inativo',   imageUrl: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic_2788792_0.jpg' },
      { id: 3, name: 'Unidade 3', class: 'Industrial', cnpjCpf: '456.789.123-00', address: 'Rua C, 789', status: 'Em andamento' ,   imageUrl: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic_2788792_0.jpg'},
      { id: 4, name: 'Unidade 4', class: 'Rural', cnpjCpf: '321.654.987-00', address: 'Rua D, 101', status: 'Ativo' ,   imageUrl: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic_2788792_0.jpg'},
      { id: 5, name: 'Unidade 5', class: 'Comercial', cnpjCpf: '654.321.987-00', address: 'Rua E, 202', status: 'Inativo',   imageUrl: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic_2788792_0.jpg' },
   ];
    consumerUnitData: ConsumerUnit[] = [];

    // Configurações
    totalItems = this.allConsumerUnits.length;
    pageSize = 5;
    currentPage = 0;
    tableColumns = [    { key: 'id', header: 'ID' },
      { key: 'name', header: 'Nome da Unidade' },
      { key: 'class', header: 'Classe' },
      { key: 'cnpjCpf', header: 'CNPJ/CPF' },
      { key: 'address', header: 'Endereço' },
      { 
        key: 'status', 
        header: 'Status',
        cellClass: (element: ConsumerUnit) => {
          return element.status === 'Ativo' 
            ? 'status-badge status-ativo' 
            : element.status === 'Em andamento' 
            ? 'status-badge status-andamento' 
            : 'status-badge status-inativo';
        }
      },
      { 
        key: 'photo', 
        header: 'Foto',
        imageOptions: {
          srcKey: 'imageUrl',    // Propriedade do objeto que contém a URL
          altKey: 'name',        // Propriedade para o texto alternativo
          width: '40px',         // Tamanho opcional
          height: '40px'
        }
      }
    ];
    selectedConsumerUnit: ConsumerUnit | null = null;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.error = null;

    // Simula uma chamada API
    setTimeout(() => {
      // Para simular erro, altere para false
      const success = true;

      if (success) {
        // Carregamento bem sucedido
        this.isLoading = false;
        
      } else {
        this.error = 'Falha ao carregar dados';
        this.isLoading = false;
      }
    }, 2000);
  }

  handleRetry() {
    this.loadData(); // Reinicia o processo
  }

  constructor() {
    this.updatePageData();
  }

  // Atualiza os dados exibidos na página atual
  private updatePageData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.consumerUnitData = this.allConsumerUnits.slice(startIndex, endIndex);
  }

  handleAdd() {
    console.log('Adicionar nova unidade consumidora');
  }

  handleEdit(consumerUnit: ConsumerUnit) {
    console.log('Editar unidade consumidora:', consumerUnit);
  }

  handleDelete(consumerUnit: ConsumerUnit) {
    console.log('Excluir unidade consumidora:', consumerUnit);
    // Atualiza a lista após exclusão
    this.allConsumerUnits = this.allConsumerUnits.filter(item => item.id !== consumerUnit.id);
    this.totalItems = this.allConsumerUnits.length;
    this.updatePageData();
  }

  handleSelect(consumerUnit: ConsumerUnit) {
    console.log('Unidade consumidora selecionada:', consumerUnit);
    this.selectedConsumerUnit = consumerUnit;
  }

  handlePageChange(event: { page: number, pageSize: number }) {
    console.log('Mudança de página:', event);
    this.currentPage = event.page;
    this.pageSize = event.pageSize;
    this.updatePageData();
  }

  handleBulkDelete(items: ConsumerUnit[]): void {
    console.log('Itens selecionados para exclusão:', items);
  }
}