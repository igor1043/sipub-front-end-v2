import { Component } from '@angular/core';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';
import { SvgIconComponent } from "../../../desing-system/ui-components/svg-icon/svg-icon.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
        private localStorageService: LocalStorageService
  ) {}

}