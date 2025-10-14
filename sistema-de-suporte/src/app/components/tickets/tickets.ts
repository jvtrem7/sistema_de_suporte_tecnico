import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Adicione, caso precise de *ngIf/*ngFor no futuro
import { RouterLink, Router } from '@angular/router'; // ESSENCIAL: Adicione Router

@Component({
  selector: 'app-tickets',
  standalone: true, 
  imports: [RouterLink, CommonModule], 
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class TicketsComponent {

  // CONSTRUTOR: Injete o Router
  constructor(private router: Router) {} 

  // MÉTODO: Dispara a navegação
  editarTicket(id: number) {
    // ESSENCIAL: O método navigate faz a navegação programática
    this.router.navigate(['/tickets/editar', id]); 
  }
}