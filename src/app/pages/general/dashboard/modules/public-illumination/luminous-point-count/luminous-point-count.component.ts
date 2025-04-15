import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-luminous-point-count',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './luminous-point-count.component.html',
  styleUrls: ['./luminous-point-count.component.css']
})
export class LuminousPointCountComponent {
  title = 'Luminous Points';
  municipalPoints = 520;
  concessionairePoints = 308;
  icon = 'highlight'; // You can customize the icon if needed
}
