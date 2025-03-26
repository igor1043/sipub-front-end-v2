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
  allConsumerUnits: ConsumerUnit[] = [
    { id: 1, name: 'Unidade 1', class: 'Comercial', cnpjCpf: '123.456.789-00', address: 'Rua Don João VI, 123 efgeriljjipwerfn gpornwg nrn goẃrfno ǵnbníog j', status: 'Ativo', imageUrl: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic_2788792_0.jpg' },
    { id: 2, name: 'Unidade 2', class: 'Residencial', cnpjCpf: '987.654.321-00', address: 'Rua B, 456', status: 'Inativo', imageUrl: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic_2788792_0.jpg' },
    { id: 3, name: 'Unidade 3', class: 'Industrial', cnpjCpf: '456.789.123-00', address: 'Rua C, 789', status: 'Em andamento', imageUrl: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic_2788792_0.jpg' },
    { id: 4, name: 'Unidade 4', class: 'Rural', cnpjCpf: '321.654.987-00', address: 'Rua D, 101', status: 'Ativo', imageUrl: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic_2788792_0.jpg' },
    { id: 5, name: 'Unidade 5', class: 'Comercial', cnpjCpf: '654.321.987-00', address: 'Rua E, 202', status: 'Inativo', imageUrl: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic_2788792_0.jpg' },
    { id: 6, name: 'Unidade 6', class: 'Residencial', cnpjCpf: '111.222.333-44', address: 'Rua F, 303', status: 'Ativo', imageUrl: 'https://source.unsplash.com/random/200x200?sig=6' },
  { id: 7, name: 'Unidade 7', class: 'Industrial', cnpjCpf: '555.666.777-88', address: 'Rua G, 404', status: 'Em andamento', imageUrl: 'https://source.unsplash.com/random/200x200?sig=7' },
  { id: 8, name: 'Unidade 8', class: 'Rural', cnpjCpf: '999.888.777-66', address: 'Rua H, 505', status: 'Ativo', imageUrl: 'https://source.unsplash.com/random/200x200?sig=8' },
  { id: 9, name: 'Unidade 9', class: 'Comercial', cnpjCpf: '222.333.444-55', address: 'Rua I, 606', status: 'Inativo', imageUrl: 'https://source.unsplash.com/random/200x200?sig=9' },
  { id: 10, name: 'Unidade 10', class: 'Residencial', cnpjCpf: '777.666.555-44', address: 'Rua J, 707', status: 'Ativo', imageUrl: 'https://source.unsplash.com/random/200x200?sig=10' },
  { id: 11, name: 'Unidade 11', class: 'Industrial', cnpjCpf: '333.444.555-66', address: 'Rua K, 808', status: 'Em andamento', imageUrl: 'https://source.unsplash.com/random/200x200?sig=11' },
  { id: 12, name: 'Unidade 12', class: 'Rural', cnpjCpf: '888.999.000-11', address: 'Rua L, 909', status: 'Ativo', imageUrl: 'https://source.unsplash.com/random/200x200?sig=12' },
  { id: 13, name: 'Unidade 13', class: 'Comercial', cnpjCpf: '444.555.666-77', address: 'Rua M, 1010', status: 'Inativo', imageUrl: 'https://source.unsplash.com/random/200x200?sig=13' },
  { id: 14, name: 'Unidade 14', class: 'Residencial', cnpjCpf: '666.777.888-99', address: 'Rua N, 1111', status: 'Ativo', imageUrl: 'https://source.unsplash.com/random/200x200?sig=14' },
  { id: 15, name: 'Unidade 15', class: 'Industrial', cnpjCpf: '000.111.222-33', address: 'Rua O, 1212', status: 'Em andamento', imageUrl: 'https://source.unsplash.com/random/200x200?sig=15' },
  { id: 16, name: 'Unidade 16', class: 'Rural', cnpjCpf: '123.123.123-45', address: 'Rua P, 1313', status: 'Ativo', imageUrl: 'https://source.unsplash.com/random/200x200?sig=16' },
  { id: 17, name: 'Unidade 17', class: 'Comercial', cnpjCpf: '987.987.987-65', address: 'Rua Q, 1414', status: 'Inativo', imageUrl: 'https://source.unsplash.com/random/200x200?sig=17' },

  ];
  consumerUnitData: ConsumerUnit[] = [];

  // Configurações
  totalItems = this.allConsumerUnits.length;
  pageSize = 5;
  currentPage = 0;
  tableColumns = [{ key: 'id', header: 'ID' },
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