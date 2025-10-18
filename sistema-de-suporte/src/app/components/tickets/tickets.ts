import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chamado, ChamadoService } from '../../services/chamado';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './tickets.html',
  styleUrls: ['./tickets.css']
})
export class TicketsComponent implements OnInit {

  chamados: Chamado[] = [];
  ultimaAtualizacao: Date | null = null;
  statusPopUpVisivel = true;
  sidebarAberta = false;
  termoDePesquisa = '';

  constructor(
    private router: Router,
    private chamadoService: ChamadoService
  ) {}

  ngOnInit() {
    this.carregarChamados();
  }

  carregarChamados() {
    this.chamadoService.getChamados().subscribe({
      next: (data) => {
        // Converte setor para string caso venha como enum
        this.chamados = data.map(c => ({
          ...c,
          setor: c.setor ? String(c.setor) : '-'
        }));
        this.ultimaAtualizacao = new Date();
      },
      error: (err) => {
        console.error('Erro ao carregar chamados:', err);
        alert('Erro ao carregar chamados do servidor.');
      }
    });
  }

  atualizarLista() {
    this.carregarChamados();
    alert(`Lista de chamados atualizada!`);
  }

  editarChamado(id: number) {
    this.router.navigate(['/tickets/editar', id]);
  }

  criarChamado() {
    this.router.navigate(['/tickets/novo']);
  }

  fazerLogout() {
    this.router.navigate(['/login']);
  }

  realizarPesquisa() {
    const termo = this.termoDePesquisa.trim().toLowerCase();

    if (!termo) {
      this.carregarChamados();
      return;
    }

    this.chamados = this.chamados.filter(c =>
      c.titulo.toLowerCase().includes(termo) ||
      c.descricao.toLowerCase().includes(termo) ||
      c.status.toLowerCase().includes(termo) ||
      (c.setor?.toLowerCase().includes(termo) ?? false)
    );
  }

  toggleSidebar() {
    this.sidebarAberta = !this.sidebarAberta;
  }

  navegarEFechar() {
    if (this.sidebarAberta) {
      this.sidebarAberta = false;
    }
  }

  fecharStatusPopUp() {
    this.statusPopUpVisivel = false;
  }
}
