// src/app/components/recuperar-senha/recuperar-senha.ts

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; // <--- CORREÇÃO 1: Importe FormsModule

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  // CORREÇÃO 2: Adicione FormsModule aos imports
  imports: [RouterLink, CommonModule, FormsModule], 
  templateUrl: './recuperar-senha.html',
  styleUrl: './recuperar-senha.css'
})
export class RecuperarSenhaComponent {
  
  // CORREÇÃO 3: Declare a variável 'email' para ligar ao [(ngModel)]
  email: string = ''; 
  
  // CORREÇÃO 4: Defina o método 'enviarLink' para ligar ao (ngSubmit)
  enviarLink() {
      if (this.email.trim().length > 0) {
          alert(`Simulação: Um link de reset foi enviado para: ${this.email}.`);
      } else {
          alert('Por favor, insira um e-mail válido.');
      }
  }
}