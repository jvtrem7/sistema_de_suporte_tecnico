import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { RouterLink, ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-novo-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './novo-ticket.html',
  styleUrl: './novo-ticket.css'
})

export class NovoTicketComponent implements OnInit { 

  ticketId: string | null = null;
  modoEdicao: boolean = false;
  
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ticketId = params.get('id');
      
      if (this.ticketId) {
        this.modoEdicao = true;
      } else {
        this.modoEdicao = false;
      }
    });
  }

  deletarTicket() {
    if (confirm(`Tem certeza que deseja DELETAR o Ticket ID: ${this.ticketId}?`)) {
      console.log(`[AÇÃO DELETAR] Excluindo Ticket ID: ${this.ticketId}`);
      this.router.navigate(['/tickets']);
    }
  }

  salvarOuAdicionar() {
    if (this.modoEdicao) {
      console.log(`Atualizando Ticket ID: ${this.ticketId}`);
    } else {
      console.log("Criando Novo Ticket.");
    }
    this.router.navigate(['/tickets']);
  }
  
  arquivosSelecionados: File[] = [];

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.arquivosSelecionados = Array.from(event.target.files);
      console.log('Arquivos selecionados:', this.arquivosSelecionados);
    } else {
      this.arquivosSelecionados = [];
    }
  }
}