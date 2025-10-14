import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink, Router } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  
  sidebarAberta: boolean = true; 
  
  ticketsExpandidos: boolean = false;
  clientesExpandidos: boolean = false;

  constructor(private router: Router) {} 
  
  toggleSidebar() {
    this.sidebarAberta = !this.sidebarAberta;
  }

  toggleTickets() {
    this.ticketsExpandidos = !this.ticketsExpandidos;
  }

  toggleClientes() {
    this.clientesExpandidos = !this.clientesExpandidos;
  }
  
  fazerLogout() {
      this.router.navigate(['/login']);
  }
}