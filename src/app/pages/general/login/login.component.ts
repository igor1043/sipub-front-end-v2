import { Component, OnInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../desing-system/ui-components/button/button.component';
import { SvgIconComponent } from '../../../desing-system/ui-components/svg-icon/svg-icon.component';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service'; // Importe o serviço de tema

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, ButtonComponent, SvgIconComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  @HostBinding('class.dark-theme') isDarkTheme = false; 

  loginForm: FormGroup;
  hidePassword = true;
  isLoading: boolean = false;
  loginError: string | null = null; // Variável para controlar a mensagem de erro

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.themeService.isDarkTheme$.subscribe((isDarkTheme) => {
      this.isDarkTheme = isDarkTheme;
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Dados enviados:', this.loginForm.value);
    } else {
      console.log('Formulário inválido');
    }
  }

  onForgotPasswordClick() {
    console.log('Redirecionando para a página de recuperação de senha');
    //this.router.navigate(['/forgot-password']); // Redireciona para a página de recuperação de senha
  }

  onRegisterClick() {
    console.log('Redirecionando para a página de cadastro');
    //this.router.navigate(['/register']); // Redireciona para a página de cadastro
  }

  onFacilitaTechClick() {
    console.log('Redirecionando para Facilita.tech');
    //this.router.navigate(['/facilita-tech']); // Redireciona para a página Facilita.tech
  }

  resetPage() {
    this.loginForm.reset();
    this.isLoading = false;
    this.loginError = null; // Reseta a mensagem de erro ao limpar o formulário
  }
  
  onLogin() {
    this.isLoading = true;
    this.loginError = null; // Reseta a mensagem de erro ao tentar fazer login novamente
  
    const loginData = {
      username: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      id_api: 'a7482566-f66e-4211-b8a9-700ee58960e3',
    };
  
    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.resetPage();
        this.router.navigate(['/dashboard']); // Redireciona para a dashboard após o login bem-sucedido
      },
      error: (err) => {
        console.error('Login falhou:', err);
        this.loginError = 'Usuário ou senha incorretos'; // Define a mensagem de erro
        this.isLoading = false; // Para o carregamento
      },
    });
  }
}