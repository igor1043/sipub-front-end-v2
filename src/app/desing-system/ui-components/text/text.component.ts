import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text',
  imports: [CommonModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css',
})
export class TextComponent {
  @Input() text: string = ''; // Texto a ser exibido
  @Input() size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium'; // Tamanho do texto
  @Input() color: string | undefined; // Cor do texto (opcional)
  @Input() bold: boolean = false; // Se o texto é negrito (opcional)

  // Método para gerar as classes dinamicamente
  get textClasses(): string {
    return `${this.size} ${this.bold ? 'bold' : ''}`;
  }
}
