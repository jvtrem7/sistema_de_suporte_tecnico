import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { TicketsComponent } from './components/tickets/tickets';
import { NovoTicketComponent } from './components/novo-ticket/novo-ticket';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha'; 


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tickets', component: TicketsComponent },
  
 
  { path: 'tickets/novo', component: NovoTicketComponent },
  { path: 'tickets/editar/:id', component: NovoTicketComponent }, 
  
  
  { path: 'recuperar-senha', component: RecuperarSenhaComponent }, 

  
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' } 
];