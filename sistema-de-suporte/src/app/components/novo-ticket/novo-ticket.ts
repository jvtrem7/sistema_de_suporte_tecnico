import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { RouterLink, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-novo-ticket',
  standalone: true,
  // Importe todos os módulos necessários para o HTML
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './novo-ticket.html',
  styleUrl: './novo-ticket.css'
})
export class NovoTicketComponent implements OnInit {

  // Variáveis para definir o modo da tela
  ticketId: string | null = null;
  modoEdicao: boolean = false;
  
  // Injete o ActivatedRoute para obter o ID da URL
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Verifica se existe um 'id' na URL
    this.route.paramMap.subscribe(params => {
      this.ticketId = params.get('id');
      
      if (this.ticketId) {
        this.modoEdicao = true;
      } else {
        this.modoEdicao = false;
      }
    });
  }

  // Método simulado
  salvarOuAdicionar() {
    if (this.modoEdicao) {
      console.log(`Atualizando Ticket ID: ${this.ticketId}`);
    } else {
      console.log("Criando Novo Ticket.");
    }
  }
}