import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

interface Ticket {
  codigo: number;
  area: string;
  dataInicio: string;
  status: 'green' | 'yellow' | 'red';
  diasRestantes: number;
  problemas: string;
}

@Component({
  selector: 'app-tickets',
  standalone: true, 
  imports: [RouterLink, CommonModule, FormsModule], 
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class TicketsComponent implements OnInit { 

  ultimaAtualizacao: Date | null = null; 
  statusPopUpVisivel: boolean = true; 
  sidebarAberta: boolean = false; 
  termoDePesquisa: string = ''; 

  // Dados Simulados
  todosTickets: Ticket[] = [
    { codigo: 6, area: 'Coordenação', dataInicio: '25/02/25', status: 'green', diasRestantes: 0, problemas: 'Falha Portal do Professor' },
    { codigo: 5, area: 'Coordenação', dataInicio: '20/02/25', status: 'yellow', diasRestantes: 0, problemas: 'Falha Sistema Acadêmico' },
    { codigo: 4, area: 'Secretaria', dataInicio: '18/02/25', status: 'red', diasRestantes: 7, problemas: 'Sistema de Matricula' },
    { codigo: 3, area: 'Direção', dataInicio: '02/01/25', status: 'green', diasRestantes: 0, problemas: 'Sistema de RH' },
    { codigo: 2, area: 'Secretaria', dataInicio: '10/01/25', status: 'green', diasRestantes: 0, problemas: 'Boletos de Mensalidade' },
    { codigo: 1, area: 'Secretaria', dataInicio: '10/01/25', status: 'yellow', diasRestantes: 2, problemas: 'Tonner Impressora' },
  ];
  ticketsExibidos: Ticket[] = [...this.todosTickets];

  constructor(private router: Router) {
    this.ticketsExibidos = [...this.todosTickets];
  } 

  ngOnInit() {
    this.carregarTicketsInicialmente();
  }

  toggleSidebar() {
    this.sidebarAberta = !this.sidebarAberta;
  }
  
  navegarEFechar() {
    if (this.sidebarAberta) {
        this.sidebarAberta = false;
    }
  }

  realizarPesquisa() {
    const termo = this.termoDePesquisa.trim().toLowerCase();

    if (termo.length > 0) {
      this.ticketsExibidos = this.todosTickets.filter(ticket => 
        (ticket.problemas && ticket.problemas.toLowerCase().includes(termo)) ||
        (ticket.area && ticket.area.toLowerCase().includes(termo)) ||
        (ticket.codigo.toString().includes(termo))
      );
      if (this.ticketsExibidos.length === 0) {
          alert(`Nenhum ticket encontrado para "${termo}".`);
      }
      
    } else {
      this.carregarTicketsInicialmente();
    }
  }

  editarTicket(id: number) {
    this.router.navigate(['/tickets/editar', id]); 
  }

  fazerLogout() {
    this.router.navigate(['/login']);
  }

  fecharStatusPopUp() {
      this.statusPopUpVisivel = false;
  }

  carregarTicketsInicialmente() {
    this.ticketsExibidos = [...this.todosTickets];
    this.ultimaAtualizacao = new Date();
  }

  atualizarLista() {
    this.carregarTicketsInicialmente(); 
    alert(`Lista de Tickets Atualizada! Última Busca: ${this.ultimaAtualizacao!.toLocaleTimeString()}`);
  }
}
