import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Chamado {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  dataAbertura: string;
  dataFechamento?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  private apiUrl = 'https://localhost:7063/api/chamado'; // URL do seu backend .NET

  constructor(private http: HttpClient) {}

  getChamados(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.apiUrl);
  }

  getChamado(id: number): Observable<Chamado> {
    return this.http.get<Chamado>(`${this.apiUrl}/${id}`);
  }

  criarChamado(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(this.apiUrl, chamado);
  }

  atualizarChamado(id: number, chamado: Chamado): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, chamado);
  }

  excluirChamado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}