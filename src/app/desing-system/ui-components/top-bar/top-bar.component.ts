import { Component, EventEmitter, Output, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service'; // Importe o serviço de tema

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  @HostBinding('class.dark-theme') isDarkTheme = false; // Aplica o tema diretamente no componente

  @Output() toggleSidebarEvent = new EventEmitter<void>();
  currentUrl: string = '';

  constructor(
    private router: Router,
    private themeService: ThemeService // Injete o ThemeService
  ) {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

  ngOnInit(): void {
    // Se inscreve no isDarkTheme$ do ThemeService para atualizar o estado do tema
    this.themeService.isDarkTheme$.subscribe((isDarkTheme) => {
      this.isDarkTheme = isDarkTheme;
    });
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  // Usa o ThemeService para alternar o tema
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    // Aqui você pode adicionar a lógica para logout
    console.log('Logout');
  }
}