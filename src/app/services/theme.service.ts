import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Disponibiliza o serviço em toda a aplicação
})
export class ThemeService {
  private isDarkThemeSubject = new BehaviorSubject<boolean>(this.getInitialTheme());
  isDarkTheme$ = this.isDarkThemeSubject.asObservable(); // Observable para os componentes se inscreverem

  constructor() {
    this.applyTheme(this.isDarkThemeSubject.value); // Aplica o tema inicial ao carregar o serviço
  }

  // Recupera o tema salvo no localStorage ou sessionStorage
  private getInitialTheme(): boolean {
    const savedTheme = localStorage.getItem('isDarkTheme'); // Ou sessionStorage
    return savedTheme ? JSON.parse(savedTheme) : false; // Tema padrão é claro (false)
  }

  // Alterna o tema e salva no localStorage ou sessionStorage
  toggleTheme(): void {
    const newTheme = !this.isDarkThemeSubject.value;
    this.isDarkThemeSubject.next(newTheme); // Atualiza o BehaviorSubject
    this.applyTheme(newTheme); // Aplica o tema no DOM
    localStorage.setItem('isDarkTheme', JSON.stringify(newTheme)); // Salva no localStorage
  }

  // Aplica o tema no DOM
  private applyTheme(isDarkTheme: boolean): void {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}