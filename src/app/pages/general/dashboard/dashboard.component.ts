import { Component } from '@angular/core';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
        private localStorageService: LocalStorageService
  ) {}

}