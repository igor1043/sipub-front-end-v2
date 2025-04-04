import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.css']
})
export class SvgIconComponent implements OnInit {
  @Input() color: string = 'var(--text-button-color)';  // Cor padrão: preto
  @Input() svgUrl?: string = '';
  @Input() width: string = '100%';  // Largura padrão: 100%
  @Input() height: string = '100%'; // Altura padrão: 100%

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadSvg();
  }

  private loadSvg(): void {
    if (typeof window !== 'undefined' && this.svgUrl) {
      const url = `${window.location.origin}${this.svgUrl}`;
  
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro ao carregar o SVG: ${response.statusText}`);
          }
          return response.text();
        })
        .then(svgContent => {
          const parser = new DOMParser();
          const svgDocument = parser.parseFromString(svgContent, 'image/svg+xml');
          const svgElement = svgDocument.querySelector('svg');
  
          if (svgElement) {
            this.applyColor(svgElement);
            this.renderer.appendChild(this.el.nativeElement, svgElement);
          }
        })
        .catch(error => console.error('Erro ao carregar o SVG:', error));
    }
  }

  private applyColor(svgElement: SVGElement): void {
    svgElement.setAttribute('fill', this.color);
    svgElement.style.width = this.width;
    svgElement.style.height = this.height;
  }
}