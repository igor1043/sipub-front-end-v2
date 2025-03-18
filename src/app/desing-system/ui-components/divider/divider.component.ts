import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-divider',
  standalone: true, // Adicionado para usar imports diretamente no componente
  imports: [CommonModule],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.css'
})
export class DividerComponent {
  @Input() color: string | undefined; // Cor personalizada (opcional)
  @Input() type: 'small' | 'medium' | 'large' = 'medium'; // Tipo do divisor (altura)
  @Input() thickness: 'thin' | 'thick' | 'extra-thick' = 'thin'; // Espessura da linha

  // Método para gerar as classes dinamicamente
  get dividerClasses(): string {
    return `${this.type} ${this.thickness === 'thick' ? 'thick' : ''} ${this.thickness === 'extra-thick' ? 'extra-thick' : ''}`;
  }
}