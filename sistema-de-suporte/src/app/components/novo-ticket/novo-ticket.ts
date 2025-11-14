import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Chamado, ChamadoService } from '../../services/chamado';

// Este enum define o que o USUÁRIO VÊ na tela (com acentos)
export enum SetorDisplay {
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

  // O <select> vai usar esta lista (com acentos)
  setores: string[] = Object.values(SetorDisplay);

  // O 'setor' no nosso formulário vai ser a string (ex: "Secretaria")
  chamado: Chamado = {
    id: 0,
    titulo: '',
    descricao: '',
    status: 'Aberto',
    dataAbertura: new Date().toISOString(),
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
      next: (dados: any) => { // Recebe como 'any' para segurança
        
        // --- MAPA REVERSO (NÚMERO -> TEXTO) ---
        // Converte o que vem do C# (0, 1, 2) para o que o <select> usa (com acento)
        const reverseEnumMap: { [key: number]: string } = {
          0: '0 - Coordenação',
          1: '1 - Secretaria',
          2: '2 - Direção',
          3: '3 - RH'
        };

        this.chamado = {
          ...dados,
          // Converte o C# (ex: 1) para o Front-end (ex: "Secretaria")
          setor: dados.setor !== undefined ? reverseEnumMap[dados.setor] : undefined,
          dataAbertura: dados.dataAbertura.split('T')[0], 
          dataFechamento: dados.dataFechamento ? dados.dataFechamento.split('T')[0] : undefined
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
   
    const enumMap: { [key: string]: number } = {
      'Coordenação': 0,
      'Secretaria': 1,
      'Direção': 2,
      'RH': 3
    };

    const payload: any = {
      ...this.chamado,
      setor: enumMap[this.chamado.setor!] 
    };

    if (this.modoEdicao) {
      this.chamadoService.atualizarChamado(this.chamado.id, payload).subscribe({
        next: () => {
          alert('Chamado atualizado com sucesso!');
          this.router.navigate(['/tickets']);
        },
        error: (err) => {
            console.error('Erro ao atualizar:', err);
            alert('Erro ao atualizar chamado. Verifique o console.');
        }
      });
    } else {
      
      // Esta parte já está CORRETA (remove 'id' e 'dataFechamento')
      const payloadBase = { ...payload };
      const { id, dataFechamento, ...payloadFinal } = payloadBase;

      // 'payloadFinal' agora tem { ... , setor: 1 }
      this.chamadoService.criarChamado(payloadFinal as Chamado).subscribe({
        next: () => {
          alert('Chamado criado com sucesso!');
          this.router.navigate(['/tickets']);
        },
        error: (err) => {
            console.error('Erro ao criar:', err);
            alert('Erro ao criar chamado. Verifique o console.');
        }
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
        error: (err) => {
            console.error('Erro ao excluir:', err);
            alert('Erro ao excluir chamado. Verifique o console.');
        }
      });
    }
  }

  onFileSelected(event: any): void {
    this.arquivosSelecionados = event.target.files
      ? Array.from(event.target.files)
      : [];
  }
}