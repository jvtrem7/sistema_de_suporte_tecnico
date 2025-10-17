import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ticket {
  codigo: number | string;   // Assumindo que 'codigo' é um ID ou número
  area: string;              // Área do ticket
  dataInicio: string;        // Usado no template, pode ser o mesmo que dataAbertura ou uma nova data
  diasRestantes: number;     // Número calculado de dias
  problemas: string;

  id: number;
  titulo: string;
  descricao: string;
  status: string; // <<-- VERIFIQUE SE ESTA LINHA EXISTE!
  dataAbertura: string;
  dataFechamento?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'https://localhost:7063/api/chamados'; // rota da sua API .NET

  constructor(private http: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  criarTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  atualizarTicket(id: number, ticket: Ticket): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, ticket);
  }

  excluirTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
