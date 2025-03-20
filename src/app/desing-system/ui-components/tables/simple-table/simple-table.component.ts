import { Component, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
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
    CommonModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css'],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }]
})
export class SimpleTableComponent<T extends { id: any }> implements OnChanges {
  @Input() data: T[] = [];
  @Input() columns: ColumnConfig[] = [];
  @Input() pageSizeOptions: number[] | undefined;
  @Input() selectedItem: T | null = null;
  @Input() sortingEnabled: boolean = true;

  @Output() onAdd = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<T>();
  @Output() onDelete = new EventEmitter<T>();
  @Output() onSelect = new EventEmitter<T>();
  @Output() onPageChange = new EventEmitter<PageEvent>();
  @Output() onSelectedItemsChange = new EventEmitter<T[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>();
  selectedItems = new Set<any>();
  isAllSelected = false;
  showFilter = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.displayedColumns = ['select', ...this.columns.map(c => c.key), 'actions'];
    }
    if (changes['data']) {
      this.dataSource.data = this.data;
      this.updateSelectAllState();
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  private updateSelectAllState(): void {
    this.isAllSelected = this.dataSource.data.length > 0 && 
                       this.selectedItems.size === this.dataSource.data.length;
  }

  private emitSelectedItems(): void {
    const selectedItemsArray = this.dataSource.data.filter(row => this.selectedItems.has(row.id));
    this.onSelectedItemsChange.emit(selectedItemsArray);
  }
}