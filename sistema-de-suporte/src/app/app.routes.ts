
import { Routes } from '@angular/router';

// 1. Importe os componentes criados
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { TicketsComponent } from './components/tickets/tickets';
import { NovoTicketComponent } from './components/novo-ticket/novo-ticket';


// 2. Defina o caminho para cada tela
export const routes: Routes = [
  // Rota de login - a primeira a ser acessada
  { path: 'login', component: LoginComponent },

  // Rotas protegidas (você deve estar logado para ver)
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'tickets/novo', component: NovoTicketComponent },
   { path: 'tickets/editar/:id', component: NovoTicketComponent }, 
   

  // Redirecionamentos:
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Quando entrar no site, vai para /login
  { path: '**', redirectTo: '/login' } // Se digitar uma rota errada, volta para /login
];

