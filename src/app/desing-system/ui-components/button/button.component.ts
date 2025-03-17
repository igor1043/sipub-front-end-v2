import { Component, HostBinding, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../ui-components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-button',
  imports: [CommonModule, SvgIconComponent,],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  @Input() mode: 'primary' | 'secondary' = 'primary'; // Modo do botão
  @Input() size: 'small' | 'medium' | 'large' = 'medium'; // Tamanho do botão
  @Input() disabled: boolean = false; // Estado de desabilitado
  @Input() isLoading: boolean = false; // Estado de carregamento
  @Input() text: string = ''; // Texto do botão
  @Input() buttonColor?: string; // Cor personalizada para o botão
  @Input() leftIconPath?: string; // Caminho do ícone à esquerda
  @Input() rightIconPath?: string; // Caminho do ícone à direita

  @Output() clicked = new EventEmitter<void>(); // Evento de clique

  constructor() { }

  onClick(): void {
    if (!this.disabled && !this.isLoading) {
      this.clicked.emit();
    }
  }
}
