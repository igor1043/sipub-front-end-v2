import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, MatSortModule } from '@angular/material/sort'; 
import { CustomPaginatorIntl } from './custom-paginator-intl';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface ColumnConfig {
  key: string;
  header: string;
}

@Component({
  selector: 'app-simple-table',
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCheckboxModule, 
    CommonModule,
    MatSortModule,MatFormFieldModule,MatInputModule
  ],
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css'],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }]
})
export class SimpleTableComponent<T extends { id: any }> implements AfterViewInit, OnChanges {
  @Input() data: T[] = [];
  @Input() columns: ColumnConfig[] = [];
  @Input() pageSizeOptions: number[] | undefined;
  @Input() selectedItem: T | null = null;
  @Input() sortingEnabled: boolean = true; // Parâmetro para controlar o sorting

  @Output() onAdd = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<T>();
  @Output() onDelete = new EventEmitter<T>();
  @Output() onSelect = new EventEmitter<T>();
  @Output() onPageChange = new EventEmitter<PageEvent>();
  @Output() onSelectedItemsChange = new EventEmitter<T[]>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; // Referência ao MatSort

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>();

  selectedItems = new Set<any>();
  isAllSelected = false;
  showFilter: boolean = false; // Controle de visibilidade do campo de pesquisa

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columns']) {
      this.displayedColumns = ['select', ...this.columns.map(c => c.key), 'actions'];
    }
    if (changes['data']) {
      this.dataSource.data = this.data;
      this.updateSelectAllState();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if (this.sortingEnabled) {
      this.dataSource.sort = this.sort; // Ativa o sorting se estiver habilitado
    }
  }

  toggleSelection(row: T): void {
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

  toggleSelectAll(): void {
    if (this.isAllSelected) {
      this.selectedItems.clear();
    } else {
      this.dataSource.data.forEach(row => this.selectedItems.add(row.id));
    }
    this.isAllSelected = !this.isAllSelected;
    this.emitSelectedItems();
  }

  updateSelectAllState(): void {
    this.isAllSelected = this.dataSource.data.length > 0 && this.selectedItems.size === this.dataSource.data.length;
  }

  emitSelectedItems(): void {
    const selectedItemsArray = this.dataSource.data.filter(row => this.selectedItems.has(row.id));
    this.onSelectedItemsChange.emit(selectedItemsArray);
  }

  // Método para aplicar o filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}