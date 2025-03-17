import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../desing-system/ui-components/button/button.component';
import { SvgIconComponent } from '../../../desing-system/ui-components/svg-icon/svg-icon.component';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, ButtonComponent, SvgIconComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService], 
})

export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isDarkTheme = false; // Tema inicial (claro)
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService,) { //  
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {

  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Dados enviados:', this.loginForm.value);
  
    } else {
      console.log('Formulário inválido');
    }
  }
  
  onForgotPasswordClick() {
    // Lógica para "Esqueceu a senha?"
    this.router.navigate(['/dashboard']);
    console.log('Redirecionando para a página de recuperação de senha');
  }

  onRegisterClick() {
    // Lógica para "Cadastre-se"
    console.log('Redirecionando para a página de cadastro');
  }

  onFacilitaTechClick() {
    // Lógica para "Conheça a Facilita.tech"
    console.log('Redirecionando para Facilita.tech');
  }

  resetPage() {
    this.loginForm.reset();  // Reseta o formulário
    this.isLoading = false;  // Reseta o estado de carregamento
  }

  onLogin() {
    this.isLoading = true;

    const loginData = {
      username: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      id_api: 'a7482566-f66e-4211-b8a9-700ee58960e3'
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        alert('Login realizado com sucesso!');
        this.resetPage()
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login falhou:', err);
        
        
        this.resetPage()
      }
    }); 
  }
}

