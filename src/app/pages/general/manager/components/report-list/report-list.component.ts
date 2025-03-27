import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReportGroup, ReportSubItem } from './report.interface';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
  standalone: true
})
export class ReportListComponent {
  @Input() reportGroups: ReportGroup[] = [];
  @Output() subItemSelected = new EventEmitter<ReportSubItem>();
  activeSubItemId: number | null = null;

  selectSubItem(subItem: ReportSubItem) {
    this.activeSubItemId = subItem.id;
    this.subItemSelected.emit(subItem);
  }
}