import { Component, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

export interface ColumnConfig {
  key: string;
  header: string;
  cellClass?: (element: any) => string; 
  imageOptions?: { // Opções específicas para imagens
    srcKey: string;
    altKey: string;
    width?: string;
    height?: string;
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
export class SimpleTableComponent<T extends { id: any }> implements OnChanges {
  @Input() data: T[] = [];
  @Input() columns: ColumnConfig[] = [];
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50];
  @Input() selectedItem: T | null = null;
  @Input() sortingEnabled: boolean = true;
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() currentPage = 0;

  @Output() onAdd = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<T>();
  @Output() onDelete = new EventEmitter<T>();
  @Output() onSelect = new EventEmitter<T>();
  @Output() pageChanged = new EventEmitter<{ page: number, pageSize: number }>();
  @Output() onSelectedItemsChange = new EventEmitter<T[]>();
  @Output() onBulkDelete = new EventEmitter<T[]>();

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>();
  selectedItems = new Set<any>();
  isAllSelected = false;
  showFilter = false;
  filterValue: string = '';
  selectedColumn: string = 'all';
  filterableColumns: ColumnConfig[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.displayedColumns = ['select', ...this.columns.map(c => c.key), 'actions'];
      this.filterableColumns = this.columns.filter(c => !c.imageOptions);
    }
    if (changes['data']) {
      this.dataSource.data = this.data;
      this.selectedItems.clear();
      this.updateSelectAllState();
    }
  }

  applyFilter(): void {
    this.dataSource.filterPredicate = (data: T, filter: string): boolean => {
      const searchText = filter.toLowerCase();
      
      if (this.selectedColumn === 'all') {
        return Object.values(data).some(value => 
          value?.toString().toLowerCase().includes(searchText)
        );
      }
      
      const cellValue = data[this.selectedColumn as keyof T];
      return cellValue?.toString().toLowerCase().includes(searchText) || false;
    };

    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

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

  isSelected(row: T): boolean {
    return this.selectedItems.has(row.id);
  }

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

  clearSelections(): void {
    this.selectedItems.clear();
    this.updateSelectAllState();
    this.emitSelectedItems();
  }

  getDisplayedRange(): string {
    const start = this.currentPage * this.pageSize + 1;
    const end = Math.min((this.currentPage + 1) * this.pageSize, this.totalItems);
    return `${start}-${end} de ${this.totalItems} itens`;
  }

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

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  private emitPageChange(): void {
    this.pageChanged.emit({
      page: this.currentPage,
      pageSize: this.pageSize
    });
  }

  private updateSelectAllState(): void {
    this.isAllSelected = this.dataSource.data.length > 0 && 
                       this.selectedItems.size === this.dataSource.data.length;
  }

  private emitSelectedItems(): void {
    const selectedItemsArray = this.dataSource.data.filter(row => this.selectedItems.has(row.id));
    this.onSelectedItemsChange.emit(selectedItemsArray);
  }

  emitBulkDelete(): void {
    const selectedItemsArray = this.data.filter(item => this.selectedItems.has(item.id));
    this.onBulkDelete.emit(selectedItemsArray);
    this.clearSelections(); // Limpa as seleções após emitir
  }
}