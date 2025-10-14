import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { TicketsComponent } from './components/tickets/tickets';
import { NovoTicketComponent } from './components/novo-ticket/novo-ticket';
// NOVO COMPONENTE:
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha'; 


export const routes: Routes = [
  // Rota de login (ponto de entrada)
  { path: 'login', component: LoginComponent },

  // Rotas para a área logada
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tickets', component: TicketsComponent },
  
  // Rotas de CRUD
  { path: 'tickets/novo', component: NovoTicketComponent },
  { path: 'tickets/editar/:id', component: NovoTicketComponent }, 
  
  // ROTA DO ESQUECEU A SENHA
  { path: 'recuperar-senha', component: RecuperarSenhaComponent }, 

  // Redirecionamentos:
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' } 
];