
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule], 
  templateUrl: './recuperar-senha.html',
  styleUrl: './recuperar-senha.css'
})
export class RecuperarSenhaComponent {
  
  
  email: string = ''; 
  
  enviarLink() {
      if (this.email.trim().length > 0) {
          alert(`Simulação: Um link de reset foi enviado para: ${this.email}.`);
      } else {
          alert('Por favor, insira um e-mail válido.');
      }
  }
}