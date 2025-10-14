import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  // 3. Variáveis para armazenar o email e a senha digitados
  email: string = '';
  senha: string = '';
  loginInvalido: boolean = false; // Para exibir mensagem de erro

  constructor(private router: Router) {}

  fazerLogin() {
    
    const EMAIL_CORRETO = 'teste@vassouras.com';
    const SENHA_CORRETA = '123456';

    if (this.email === EMAIL_CORRETO && this.senha === SENHA_CORRETA) {
      this.loginInvalido = false;
    
      this.router.navigate(['/dashboard']); 
    } else {
      
      this.loginInvalido = true;
      console.log("Email ou senha incorretos.");
    }
  }
}