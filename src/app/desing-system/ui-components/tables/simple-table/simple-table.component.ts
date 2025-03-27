import { Component, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

// Interface para configuração das colunas da tabela
export interface ColumnConfig {
  key: string;          // Chave de identificação da coluna (deve corresponder à propriedade do objeto)
  header: string;        // Título exibido no cabeçalho
  cellClass?: (element: any) => string; // Função para classes CSS dinâmicas
  imageOptions?: {       // Opções para colunas de imagem
    srcKey: string;      // Chave para URL da imagem
    altKey: string;      // Chave para texto alternativo
    width?: string;      // Largura da imagem
    height?: string;     // Altura da imagem
  };
}

@Component({
  selector: 'app-simple-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css']
})
export class SimpleTableComponent<T extends { id: any }> implements OnChanges, AfterViewInit {
  // Inputs do componente
  @Input() data: T[] = [];               // Dados da tabela
  @Input() columns: ColumnConfig[] = []; // Configuração das colunas
  @Input() totalItems = 0;               // Total de itens para paginação
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50, this.totalItems]; // Opções de paginação
  @Input() selectedItem: T | null = null; // Item selecionado
  @Input() sortingEnabled: boolean = true; // Habilita/desabilita ordenação
  @Input() pageSize = 10;                // Itens por página
  @Input() currentPage = 0;              // Página atual

  // Outputs do componente (eventos)
  @Output() onAdd = new EventEmitter<void>();          // Evento de adição
  @Output() onEdit = new EventEmitter<T>();            // Evento de edição
  @Output() onDelete = new EventEmitter<T>();          // Evento de exclusão
  @Output() onSelect = new EventEmitter<T>();          // Evento de seleção
  @Output() pageChanged = new EventEmitter<{ page: number, pageSize: number }>(); // Mudança de página
  @Output() onSelectedItemsChange = new EventEmitter<T[]>(); // Seleção múltipla
  @Output() onBulkDelete = new EventEmitter<T[]>();    // Exclusão em massa

  @ViewChild(MatSort) sort!: MatSort; // Referência ao componente de ordenação

  // Variáveis internas
  displayedColumns: string[] = [];     // Colunas exibidas na tabela
  dataSource = new MatTableDataSource<T>(); // Fonte de dados para a tabela
  selectedItems = new Set<any>();      // Itens selecionados (armazenados por ID)
  isAllSelected = false;               // Estado de seleção total
  showFilter = false;                  // Controle de exibição do filtro
  filterValue: string = '';            // Valor do filtro
  selectedColumn: string = 'all';      // Coluna selecionada para filtro
  filterableColumns: ColumnConfig[] = []; // Colunas que podem ser filtradas

  // Configura a ordenação após a inicialização da view
  ngAfterViewInit(): void {
    this.connectSort();
  }

  // Atualiza o componente quando há mudanças nos inputs
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.displayedColumns = ['select', ...this.columns.map(c => c.key), 'actions'];
      this.filterableColumns = this.columns.filter(c => !c.imageOptions); // Colunas filtradas não podem ser imagens
    }

    if (changes['sortingEnabled'] && this.sort) {
      this.sort.disabled = !this.sortingEnabled; // Habilita/desabilita ordenação
    }
  }

  // Conecta o componente de ordenação à fonte de dados
  private connectSort(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
      // Customiza a ordenação para colunas de imagem
      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
        const column = this.columns.find(c => c.key === sortHeaderId);
        if (column?.imageOptions) {
          return data[column.imageOptions.altKey]?.toLowerCase() || '';
        }
        return data[sortHeaderId]?.toString().toLowerCase() || '';
      };
    }
  }

  // Aplica o filtro na tabela
  applyFilter(): void {
    this.dataSource.filterPredicate = (data: T, filter: string): boolean => {
      const searchText = filter.toLowerCase();
      
      if (this.selectedColumn === 'all') {
        // Filtra em todas as colunas
        return Object.values(data).some(value => 
          value?.toString().toLowerCase().includes(searchText)
        );
      }
      
      // Filtra apenas na coluna selecionada
      const cellValue = data[this.selectedColumn as keyof T];
      return cellValue?.toString().toLowerCase().includes(searchText) || false;
    };

    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  // Seleciona/deseleciona uma linha
  toggleSelection(row: T, event: MouseEvent): void {
    event.stopPropagation();
    if (this.selectedItems.has(row.id)) {
      this.selectedItems.delete(row.id);
    } else {
      this.selectedItems.add(row.id);
    }
    this.updateSelectAllState();
    this.emitSelectedItems();
  }

  // Verifica se uma linha está selecionada
  isSelected(row: T): boolean {
    return this.selectedItems.has(row.id);
  }

  // Seleciona/deseleciona todas as linhas
  toggleSelectAll(event: MouseEvent): void {
    event.stopPropagation();
    if (this.isAllSelected) {
      this.selectedItems.clear();
    } else {
      this.dataSource.data.forEach(row => this.selectedItems.add(row.id));
    }
    this.isAllSelected = !this.isAllSelected;
    this.emitSelectedItems();
  }

  // Limpa todas as seleções
  clearSelections(): void {
    this.selectedItems.clear();
    this.updateSelectAllState();
    this.emitSelectedItems();
  }

  // Retorna o intervalo de itens exibidos
  getDisplayedRange(): string {
    const start = this.currentPage * this.pageSize + 1;
    const end = Math.min((this.currentPage + 1) * this.pageSize, this.totalItems);
    return `${start}-${end} de ${this.totalItems} itens`;
  }

  // Manipuladores de paginação
  onPageSizeChange(): void {
    this.currentPage = 0;
    this.emitPageChange();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.emitPageChange();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.emitPageChange();
    }
  }

  firstPage(): void {
    this.currentPage = 0;
    this.emitPageChange();
  }

  lastPage(): void {
    this.currentPage = Math.max(0, this.totalPages - 1);
    this.emitPageChange();
  }

  // Calcula o total de páginas
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  // Emite evento de mudança de página
  private emitPageChange(): void {
    this.pageChanged.emit({
      page: this.currentPage,
      pageSize: this.pageSize
    });
  }

  // Atualiza o estado da seleção total
  private updateSelectAllState(): void {
    this.isAllSelected = this.dataSource.data.length > 0 && 
                       this.selectedItems.size === this.dataSource.data.length;
  }

  // Emite os itens selecionados
  private emitSelectedItems(): void {
    const selectedItemsArray = this.dataSource.data.filter(row => this.selectedItems.has(row.id));
    this.onSelectedItemsChange.emit(selectedItemsArray);
  }

  // Emite evento de exclusão em massa
  emitBulkDelete(): void {
    const selectedItemsArray = this.data.filter(item => this.selectedItems.has(item.id));
    this.onBulkDelete.emit(selectedItemsArray);
    this.clearSelections();
  }

  // Gera a lista de páginas para exibição
  getDisplayedPages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      return Array.from({length: this.totalPages}, (_, i) => i + 1);
    }

    const start = Math.max(1, this.currentPage - 1);
    const end = Math.min(this.totalPages, this.currentPage + 3);

    if (start > 1) pages.push(1);
    if (start > 2) pages.push('...');
    
    for (let i = start; i <= end; i++) pages.push(i);
    
    if (end < this.totalPages - 1) pages.push('...');
    if (end < this.totalPages) pages.push(this.totalPages);

    return pages;
  }
  
  // Navega para uma página específica
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.emitPageChange();
    }
  }
}