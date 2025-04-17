import { Component, OnInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../desing-system/ui-components/button/button.component';
import { SvgIconComponent } from '../../../desing-system/ui-components/svg-icon/svg-icon.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service'; // Importe o serviço de tema
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';
import { NotificationComponent } from 'app/desing-system/ui-components/notification/notification.component';
import { NotificationService } from 'app/desing-system/ui-components/notification/NotificationService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, ButtonComponent, SvgIconComponent, NotificationComponent],
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
    private themeService: ThemeService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
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

  onForgotPasswordClick() {

    //this.router.navigate(['/forgot-password']); // Redireciona para a página de recuperação de senha
  }

  onRegisterClick() {

    //this.router.navigate(['/register']); // Redireciona para a página de cadastro
  }

  onFacilitaTechClick() {

    //this.router.navigate(['/facilita-tech']); // Redireciona para a página Facilita.tech
  }

  resetPage() {
    this.loginForm.reset();
    this.isLoading = false;
    this.loginError = null; // Reseta a mensagem de erro ao limpar o formulário
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      this.notificationService.showError(
        'Dados inválidos',
        'Por favor, verifique seu login e senha. A senha deve ter no mínimo 5 caracteres.'
      );

      return;
    }

    this.isLoading = true;
    this.loginError = null;

    const loginData = {
      username: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      id_api: 'a7482566-f66e-4211-b8a9-700ee58960e3',
      acl: true,
      module_description: true
    };

    try {
      const response = await firstValueFrom(this.authService.login(loginData));

      if (response) {
        this.localStorageService.saveDatalogin(response);
        this.router.navigate(['/dashboard']);
        this.resetPage();
      } else {
        throw new Error('Login response is undefined');
      }
    } catch (error: any) {
      console.error('Login falhou:', error);

      let errorMessage = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
      let notificationTitle = 'Erro';

      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401:
            errorMessage = 'Usuário ou senha incorretos.';
            notificationTitle = 'Autenticação falhou';
            break;
          case 503:
            errorMessage = 'Sistema temporariamente fora do ar. Tente novamente mais tarde.';
            notificationTitle = 'Serviço indisponível';
            break;
          case 500:
            errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
            notificationTitle = 'Erro no servidor';
            break;
        }
      }

      this.notificationService.showError(notificationTitle, errorMessage);

      this.loginError = errorMessage;
    } finally {
      this.isLoading = false;
    }
  }

}