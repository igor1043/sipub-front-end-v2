import { Component, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges, AfterViewInit, AfterViewChecked } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

export interface ColumnConfig {
  key: string;
  header: string;
  cellClass?: (element: any) => string;
  imageOptions?: {
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
export class SimpleTableComponent<T extends { id: any }> implements OnChanges, AfterViewInit, AfterViewChecked {
  @Input() data: T[] = [];
  @Input() columns: ColumnConfig[] = [];
  @Input() selectedItem: T | null = null;
  @Input() sortingEnabled: boolean = true;
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() currentPage = 0;
  @Input() crudEnabled = true;
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50];

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

  private sortConnected = false;

  ngAfterViewInit(): void {
    this.connectSort();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns'] || changes['crudEnabled']) {
      this.displayedColumns = this.crudEnabled 
        ? ['select', ...this.columns.map(c => c.key), 'actions'] 
        : [...this.columns.map(c => c.key)];
      this.filterableColumns = this.columns.filter(c => !c.imageOptions);
    }
    if (changes['data']) {
      this.dataSource.data = this.data;
      this.selectedItems.clear();
      this.updateSelectAllState();
      this.sortConnected = false;
    }
    if (changes['sortingEnabled'] && this.sort) {
      this.sort.disabled = !this.sortingEnabled;
    }
    
    if (changes['crudEnabled'] && !this.crudEnabled) {
      this.selectedItems.clear();
      this.emitSelectedItems();
    }
  }

  ngAfterViewChecked(): void {
    if (this.sort && !this.sortConnected) {
      this.connectSort();
      this.sortConnected = true;
    }
  }

  private connectSort(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
        const column = this.columns.find(c => c.key === sortHeaderId);
        if (column?.imageOptions) {
          return data[column.imageOptions.altKey]?.toLowerCase() || '';
        }
        return data[sortHeaderId]?.toString().toLowerCase() || '';
      };
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
    this.clearSelections();
  }

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
  
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.emitPageChange();
    }
  }
}