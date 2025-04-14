import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
  imports: [CommonModule],
})
export class AppDashboardLayoutComponent implements OnInit {
  @Input() columns: number = 1;
  
  constructor() { }

  ngOnInit() {
  }

}
