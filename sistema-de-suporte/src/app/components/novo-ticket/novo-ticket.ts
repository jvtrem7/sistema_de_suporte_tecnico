import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Chamado, ChamadoService } from '../../services/chamado';

// Enum do frontend, sem acento para evitar problemas no código
export enum Setor {
  Coordenacao = 'Coordenação',
  Secretaria = 'Secretaria',
  Direcao = 'Direção',
  RH = 'RH'
}

@Component({
  selector: 'app-novo-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './novo-ticket.html',
  styleUrls: ['./novo-ticket.css']
})
export class NovoTicketComponent implements OnInit {

  ticketId: string | null = null;
  modoEdicao: boolean = false;
  arquivosSelecionados: File[] = [];

  setores: string[] = Object.values(Setor);

  chamado: Chamado = {
    id: 0,
    titulo: '',
    descricao: '',
    status: 'Aberto',
    dataAbertura: new Date().toISOString().split('T')[0], // string YYYY-MM-DD
    dataFechamento: undefined,
    setor: undefined
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chamadoService: ChamadoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ticketId = params.get('id');
      if (this.ticketId) {
        this.modoEdicao = true;
        this.carregarChamado(+this.ticketId);
      }
    });
  }

  carregarChamado(id: number): void {
    this.chamadoService.getChamado(id).subscribe({
      next: (dados: Chamado) => {
        this.chamado = {
          ...dados,
          setor: dados.setor || undefined,
          dataAbertura: dados.dataAbertura,
          dataFechamento: dados.dataFechamento || undefined
        };
      },
      error: (err) => console.error('Erro ao carregar chamado:', err)
    });
  }

  salvarOuAdicionar(): void {
    if (!this.chamado.setor) {
      alert('Por favor, selecione um setor antes de continuar.');
      return;
    }
    if (!this.chamado.titulo || !this.chamado.descricao) {
      alert('Título e descrição são obrigatórios.');
      return;
    }

    // 🔹 Mapeia o setor para o valor do enum do backend (com acento)
    const enumMap: { [key: string]: string } = {
      'Coordenacao': 'Coordenação',
      'Direcao': 'Direção',
      'RH': 'RH',
      'Secretaria': 'Secretaria'
    };

    const payload: Chamado = {
      ...this.chamado,
      setor: enumMap[this.chamado.setor!]
    };

    if (this.modoEdicao) {
      this.chamadoService.atualizarChamado(this.chamado.id, payload).subscribe({
        next: () => {
          alert('Chamado atualizado com sucesso!');
          this.router.navigate(['/tickets']);
        },
        error: (err) => console.error('Erro ao atualizar:', err)
      });
    } else {
      this.chamadoService.criarChamado(payload).subscribe({
        next: () => {
          alert('Chamado criado com sucesso!');
          this.router.navigate(['/tickets']);
        },
        error: (err) => console.error('Erro ao criar:', err)
      });
    }
  }

  deletarTicket(): void {
    if (confirm(`Tem certeza que deseja DELETAR o Ticket ID: ${this.ticketId}?`)) {
      this.chamadoService.excluirChamado(Number(this.ticketId)).subscribe({
        next: () => {
          alert('Chamado excluído com sucesso!');
          this.router.navigate(['/tickets']);
        },
        error: (err) => console.error('Erro ao excluir:', err)
      });
    }
  }

  onFileSelected(event: any): void {
    this.arquivosSelecionados = event.target.files
      ? Array.from(event.target.files)
      : [];
  }
}
