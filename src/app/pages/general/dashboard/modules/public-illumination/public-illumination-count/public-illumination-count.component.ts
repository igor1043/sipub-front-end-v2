import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-public-illumination-count',
  imports: [CommonModule, MatIconModule],
  templateUrl: './public-illumination-count.component.html',
  styleUrls: ['./public-illumination-count.component.css']
})
export class PublicIlluminationCountComponent {
  title = 'Public Illumination Points';
  municipalPoints = 1248;
  concessionairePoints = 892;
  icon = 'lightbulb'; // Using Material Icons
}