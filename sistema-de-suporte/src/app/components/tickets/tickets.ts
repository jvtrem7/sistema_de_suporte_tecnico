import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router) {} 

  ngOnInit() {
    this.carregarTicketsInicialmente();
  }

  pararPropagacao(event: MouseEvent) {
    event.stopPropagation();
  }

  toggleSidebar() {
    this.sidebarAberta = !this.sidebarAberta;
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
  
  realizarPesquisa() {
    if (this.termoDePesquisa.trim().length > 0) {
      console.log(`[AÇÃO PESQUISA] Pesquisando por: "${this.termoDePesquisa}"`);
      alert(`Simulando pesquisa por: ${this.termoDePesquisa}`);
      
    } else {
      console.log("[AÇÃO PESQUISA] Limpando pesquisa e recarregando lista.");
      this.atualizarLista(); 
    }
  }

  carregarTicketsInicialmente() {
    this.ultimaAtualizacao = new Date();
  }

  atualizarLista() {
    this.carregarTicketsInicialmente(); 
    alert(`Lista de Tickets Atualizada! Última Busca: ${this.ultimaAtualizacao!.toLocaleTimeString()}`);
  }
}